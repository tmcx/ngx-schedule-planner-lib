import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {
  IActivity,
  IProcessedCustomization,
} from '../../main/internal.interfaces';
import { clone, includes, uuid } from '../../utils/functions';
import { CONFIG } from '../../config/constants';
import {
  EEvent,
  ICalendarConfig,
  ICalendarContent,
  ICalendarFilters,
  ICalendarServiceEvents,
} from './calendar.interface';
import { endOf, startOf } from '../../utils/moment';
import { ActivityHTML } from '../../utils/classes/activity-html';
import { ISelectedRange } from '../../sections/bottom-panel/main/bottom-panel.interface';
import {
  TNavigationChange,
  EPeriod,
  EMode,
  TMode,
} from '../../sections/top-panel/components/right-panel/right-panel.interface';
import { CalendarContent } from '../../../public-interfaces';
import { convertToCalendarContent } from '../../utils/convert-to-calendar-content';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  originalContent: CalendarContent;
  on: ICalendarServiceEvents;
  content: ICalendarContent[];
  config: ICalendarConfig;
  uuid: string;

  constructor() {
    this.originalContent = {
      activities: [],
      profiles: [],
      groups: {},
      roles: {},
      tags: {},
    };
    this.uuid = 'ngx-schedule-planner-' + uuid();
    this.on = {
      event: new Subject(),
    };
    this.content = [];
    this.config = {
      activity: { factor: { width: '' } },
      leftPanel: { isCollapsed: false },
      summary: {
        showingUsers: 0,
        totalUsers: 0,
      },
      referenceDate: new Date(),
      mode: EMode.monthly,
      customization: {},
      isLoading: false,
      interval: {
        endDate: new Date(),
        startDate: new Date(),
      },
      columns: [],
      title: '',
      filters: {
        groupName: '',
        userName: '',
      },
    };
  }

  changeNavigation(change: TNavigationChange) {
    this.on.event.next({ event: EEvent.navigation, data: change });
  }

  changePeriod(period: EPeriod) {
    this.refreshCalendarContent();
    this.on.event.next({ event: EEvent.period, data: period });
  }

  changeMode(mode: TMode, force = false) {
    if (this.config.mode !== mode || force) {
      this.config.mode = mode;
      this.refreshCalendarContent();
      this.on.event.next({ event: EEvent.mode, data: { mode, force } });
    }
  }

  changeReferenceDate(date: Date) {
    this.config.referenceDate = date;
    this.refreshCalendarContent();
    this.on.event.next({ event: EEvent.referenceDate, data: date });
  }

  async setCurrentContentByFiltering(content: ICalendarContent[]) {
    this.content = content;
    this.on.event.next({ event: EEvent.contentChange, data: 'filtered' });
  }

  setCurrentContentFromOriginal(originalContent?: CalendarContent) {
    this.originalContent = originalContent ?? this.originalContent;
    const { startDate, endDate } = this.config.interval;
    this.content = convertToCalendarContent(this, startDate, endDate);
    this.on.event.next({ event: EEvent.contentChange, data: 'all' });
  }

  addActivityClicked() {
    this.on.event.next({ event: EEvent.addActivityClick });
  }

  onRangeSelection(selectedRange: ISelectedRange) {
    this.refreshCalendarContent();
    this.on.event.next({ event: EEvent.selectedRange, data: selectedRange });
  }

  private refreshWidthFactor() {
    this.config.activity.factor.width =
      CONFIG.CALENDAR[this.config.mode].ACTIVITY.FACTOR.WIDTH;
  }

  setCustomization(customization: IProcessedCustomization) {
    const activityHTML = new ActivityHTML(this);
    this.config.customization = customization;
    this.content.forEach((userRow) => {
      userRow.current.forEach((activityGroups) => {
        activityGroups.activities.forEach((activities) => {
          activities.forEach((activity) => {
            activity.htmlContent = activityHTML.activityHTMLContent(activity);
          });
        });
      });
    });
  }

  setLoading(isLoading: boolean) {
    this.config.isLoading = isLoading;
    this.on.event.next({ event: EEvent.loading, data: isLoading });
  }

  setLeftPanelCollapse(isCollapsed: boolean) {
    this.config.leftPanel.isCollapsed = isCollapsed;
    this.on.event.next({ event: EEvent.leftPanelCollapse, data: isCollapsed });
  }

  async refreshCalendarContent() {
    this.setLoading(true);
    this.setMode();
    this.refreshTitle();
    this.refreshWidthFactor();
    await this.setCurrentContentFromOriginal();
    this.on.event.next({
      event: EEvent.contentChange,
      data: 'filtered',
    });
    this.startFiltering();
    this.setLoading(false);
    this.on.event.next({
      event: EEvent.afterRefreshCalendarContent,
    });
  }

  refreshTitle() {
    this.config.title = new ActivityHTML(this).calendarTitle();
  }

  private setMode() {
    const { referenceDate, mode } = this.config;
    const entity = CONFIG.CALENDAR[mode].ENTITY[0];
    const unit = CONFIG.CALENDAR[mode].ENTITY[1];
    this.config.interval = {
      startDate: startOf(referenceDate, unit),
      endDate: endOf(referenceDate, unit),
    };
    this.config.columns = entity.getColumns(startOf(referenceDate, unit));
  }

  clickOnActivity(activity: IActivity) {
    const clonedActivity = clone(activity);
    delete clonedActivity.htmlContent;
    delete clonedActivity.style;
    this.on.event.next({
      event: EEvent.clickOnActivity,
      data: clonedActivity,
    });
  }

  startFiltering(filters: ICalendarFilters = this.config.filters) {
    let showingUsers = 0;
    this.content.forEach((rowContent) => {
      rowContent.profile['hidden'] = {
        byUserName: !includes(rowContent.profile.name, filters.userName),
        byGroupName: !includes(
          rowContent.current,
          filters.groupName,
          'group.name'
        ),
      };
      if (!rowContent.profile.hidden.byUserName) {
        showingUsers++;
      }
      rowContent.current.forEach((groupedActivities) => {
        groupedActivities.group['hidden'] = {
          byGroupName: !includes(
            groupedActivities.group.name,
            filters.groupName
          ),
        };
      });
    });
    this.on.event.next({ event: EEvent.filtering });
    this.config.summary.totalUsers = this.originalContent.profiles.length;
    this.config.summary.showingUsers = showingUsers;
  }
}
