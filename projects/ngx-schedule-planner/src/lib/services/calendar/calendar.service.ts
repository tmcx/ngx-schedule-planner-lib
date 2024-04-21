import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {
  ENavigationChange,
  TNavigationChange,
  EPeriod,
  EMode,
  TMode,
} from '../../modules/right-panel/components/header/header.interface';
import {
  IActivity,
  IProcessedContent,
  IProcessedCustomization,
} from '../../main/internal.interfaces';
import { ISelectedRange } from '../../modules/right-panel/components/body/body.interface';
import { clone, uuid } from '../../utils/functions';
import { CONFIG } from '../../utils/constants';
import {
  ICalendarConfig,
  ICalendarContent,
  ICalendarSelectors,
  ICalendarServiceEvents,
} from './calendar.interface';
import { isBetween, setDate } from '../../utils/moment';
import moment from 'moment';
import { ActivityHTML } from '../../utils/classes/activity-html';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  selectors: ICalendarSelectors;
  on: ICalendarServiceEvents;
  content: ICalendarContent;
  config: ICalendarConfig;
  uuid: string;

  constructor() {
    this.uuid = 'ngx-schedule-planner-' + uuid();
    this.selectors = {
      HOST: `#${this.uuid}`,
      LEFT_PANEL: {
        PROFILE_GROUPS: `#${this.uuid} app-left-panel app-body .profile-group`,
        GROUPS: `#${this.uuid} app-left-panel app-body .profile-group .group`,
        APP_BODY: `#${this.uuid} app-left-panel app-body`,
        HOST: `#${this.uuid} app-left-panel`,
      },
      RIGHT_PANEL: {
        USER_GROUPS: `#${this.uuid} app-right-panel app-body .user-groups`,
        GROUPS: `#${this.uuid} app-right-panel app-body .user-groups .group`,
        NAVIGATOR: `#${this.uuid} app-right-panel app-header .navigator`,
        TITLE: `#${this.uuid} app-right-panel app-header .title`,
        APP_MARKER: `#${this.uuid} app-right-panel app-marker`,
        APP_BODY: `#${this.uuid} app-right-panel app-body`,
        HOST: `#${this.uuid} app-right-panel`,
      },
    };
    this.on = {
      leftPanelCollapse: new Subject(),
      addActivityClick: new Subject(),
      navigationChange: new Subject(),
      contentChange: new Subject(),
      periodChange: new Subject(),
      selectRange: new Subject(),
      modeChange: new Subject(),
      event: new Subject(),
    };
    this.content = {
      title: '',
      current: { activities: [], repetitions: [] },
      filtered: [],
      all: [],
    };
    this.config = {
      activity: { factor: { width: '' } },
      leftPanel: { isCollapsed: false },
      referenceDate: new Date(),
      mode: EMode.monthly,
      customization: {},
      isLoading: false,
      columns: [],
    };
  }

  changeNavigation(change: TNavigationChange) {
    this.on.navigationChange.next(change);
  }

  changePeriod(period: EPeriod) {
    this.on.periodChange.next(period);
    this.setCurrentActivities();
    this.setCurrentRepetitions();
    this.refreshTitle();
  }

  changeMode(mode: TMode, force = false) {
    if (this.config.mode !== mode || force) {
      this.config.mode = mode;
      this.on.modeChange.next(mode);
      this.on.navigationChange.next(ENavigationChange.mode);
      this.refreshWidthFactor();
      this.refreshActivities();
      this.refreshTitle();
    }
  }

  changeReferenceDate(date: Date) {
    this.config.referenceDate = date;
    this.changePeriod(EPeriod.referenceDate);
  }

  changeContent(content: IProcessedContent[], type: 'filtered' | 'all') {
    this.content[type] = content;
    this.on.contentChange.next(this.content);
    this.refreshActivities();
  }

  addActivityClicked() {
    this.on.addActivityClick.next();
  }

  onRangeSelection(selectedRange: ISelectedRange) {
    this.on.selectRange.next(selectedRange);
    this.refreshActivities();
  }

  private refreshWidthFactor() {
    this.config.activity.factor.width =
      CONFIG.CALENDAR[this.config.mode].ACTIVITY.FACTOR.WIDTH;
  }

  setCustomization(customization: IProcessedCustomization) {
    this.config.customization = customization;
    this.refreshActivities();
  }

  setLoading(isLoading: boolean) {
    this.config.isLoading = isLoading;
  }

  subColumns() {
    const subColumns = this.config.columns.length
      ? this.config.columns[0].subColumns
      : [];
    const endDate =
      subColumns.length > 0
        ? subColumns[subColumns.length - 1].lastSection.end
        : null;
    const startDate =
      subColumns.length > 0 ? subColumns[0].firstSection.start : null;
    return {
      subColumns,
      startDate,
      endDate,
    };
  }

  setLeftPanelCollapse(isCollapsed: boolean) {
    this.config.leftPanel.isCollapsed = isCollapsed;
    this.on.leftPanelCollapse.next(isCollapsed);
  }

  refreshActivities() {
    this.setCurrentActivities();
    this.setCurrentRepetitions();
  }

  setCurrentActivities() {
    const activityHTML = new ActivityHTML(this);
    const { startDate, endDate } = this.subColumns();
    this.content.current.activities = this.content.filtered.map((content) =>
      content.groups.map(({ groupedActivities }) => {
        const filtered: IActivity[][] = [];
        for (const group of groupedActivities) {
          const tempGroup: IActivity[] = [];
          for (const activity of group) {
            if (isBetween(activity.startDate, startDate!, endDate!)) {
              activity.style = activityHTML.activityStyle(activity);
              activity.htmlContent = activityHTML.activityHTMLContent(activity);
              tempGroup.push(activity);
            }
          }
          if (tempGroup.length > 0) {
            filtered.push(tempGroup);
          }
        }
        return filtered;
      })
    );
  }

  setCurrentRepetitions() {
    const activityHTML = new ActivityHTML(this);
    const { startDate, endDate } = this.subColumns();
    this.content.current.repetitions = this.content.filtered.map((content) =>
      content.groups.map(({ groupedActivities }) => {
        const filtered: IActivity[][] = [];

        for (const group of groupedActivities) {
          const tempGroup: IActivity[] = [];
          for (const activity of group) {
            for (const repeat of activity.repeat) {
              if (isBetween(repeat, startDate!, endDate!)) {
                const activityReplica = clone(activity);
                const startDate = moment(activity.startDate);

                activityReplica.startDate = setDate(repeat, {
                  hour: startDate.hour(),
                  minute: startDate.minute(),
                  second: startDate.second(),
                });
                activityReplica.style = activityHTML.activityStyle(activity);
                activityReplica.htmlContent =
                  activityHTML.activityHTMLContent(activity);
                tempGroup.push(activityReplica);
              }
            }
          }
          if (tempGroup.length > 0) {
            filtered.push(tempGroup);
          }
        }

        return filtered;
      })
    );
  }

  refreshTitle() {
    this.content.title = new ActivityHTML(this).calendarTitle();
  }
}
