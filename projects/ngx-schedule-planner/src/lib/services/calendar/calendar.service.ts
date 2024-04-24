import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {
  IActivity,
  IProcessedContent,
  IProcessedCustomization,
} from '../../main/internal.interfaces';
import { clone, uuid } from '../../utils/functions';
import { CONFIG } from '../../config/constants';
import {
  EEvent,
  ICalendarConfig,
  ICalendarContent,
  ICalendarSelectors,
  ICalendarServiceEvents,
} from './calendar.interface';
import { isBetween, setDate, startOf } from '../../utils/moment';
import moment from 'moment';
import { ActivityHTML } from '../../utils/classes/activity-html';
import { MonthlyCalendar } from '../../utils/monthly-calendar';
import { WeeklyCalendar } from '../../utils/weekly-calendar';
import { DailyCalendar } from '../../utils/daily-calendar';
import { ISelectedRange } from '../../sections/bottom-panel/main/bottom-panel.interface';
import {
  TNavigationChange,
  EPeriod,
  EMode,
  TMode,
} from '../../sections/top-panel/components/right-panel/right-panel.interface';

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
      APP_MARKER: `#${this.uuid} app-bottom-panel app-marker`,
      BOTTOM_PANEL: `#${this.uuid} app-bottom-panel`,
    };
    this.on = {
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

  changeContent(content: IProcessedContent[], type: 'filtered' | 'all') {
    this.content[type] = content;
    this.refreshCalendarContent();
    this.on.event.next({ event: EEvent.contentChange, data: type });
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
    this.config.customization = customization;
    this.refreshCalendarContent();
  }

  setLoading(isLoading: boolean) {
    this.config.isLoading = isLoading;
    this.on.event.next({ event: EEvent.loading, data: isLoading });
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
    this.on.event.next({ event: EEvent.leftPanelCollapse, data: isCollapsed });
  }

  refreshCalendarContent() {
    this.setMode();
    this.refreshTitle();
    this.refreshWidthFactor();
    this.setCurrent();
    this.on.event.next({
      event: EEvent.contentChange,
      data: 'filtered',
    });
  }

  private setCurrent() {
    const activityHTML = new ActivityHTML(this);
    const { startDate, endDate } = this.subColumns();
    this.content.current.repetitions = [];
    this.content.current.activities = [];

    const getActivities = (tempGroup: IActivity[], activity: IActivity) => {
      if (isBetween(activity.startDate, startDate!, endDate!)) {
        activity.style = activityHTML.activityStyle(activity);
        activity.htmlContent = activityHTML.activityHTMLContent(activity);
        tempGroup.push(activity);
      }
    };
    const getRepetitions = (tempGroup: IActivity[], activity: IActivity) => {
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
    };

    const mainRepetitions: IActivity[][][][] = [];
    const mainActivities: IActivity[][][][] = [];
    for (const content of this.content.all) {
      let allFilteredRepetitions: IActivity[][][] = [];
      let allFilteredActivities: IActivity[][][] = [];

      for (const { groupedActivities } of content.groups) {
        const filteredRepetitions: IActivity[][] = [];
        const filteredActivities: IActivity[][] = [];

        for (const group of groupedActivities) {
          const repetitions: IActivity[] = [];
          const activities: IActivity[] = [];

          for (const activity of group) {
            getRepetitions(repetitions, activity);
            getActivities(activities, activity);
          }

          if (repetitions.length > 0) {
            filteredRepetitions.push(repetitions);
          }

          if (activities.length > 0) {
            filteredActivities.push(activities);
          }
        }

        allFilteredRepetitions = [
          ...allFilteredRepetitions,
          filteredRepetitions,
        ];
        allFilteredActivities = [...allFilteredActivities, filteredActivities];
      }

      mainRepetitions.push(allFilteredRepetitions);
      mainActivities.push(allFilteredActivities);
    }

    this.content.current.repetitions = mainRepetitions;
    this.content.current.activities = mainActivities;
  }

  refreshTitle() {
    this.content.title = new ActivityHTML(this).calendarTitle();
  }

  private setMode() {
    const { referenceDate, mode } = this.config;
    switch (mode) {
      case EMode.monthly:
        this.config.columns = MonthlyCalendar.getColumns(
          startOf(referenceDate, 'month')
        );
        break;
      case EMode.weekly:
        this.config.columns = WeeklyCalendar.getColumns(
          startOf(referenceDate, 'week')
        );
        break;
      case EMode.daily:
        this.config.columns = DailyCalendar.getColumns(referenceDate);
        break;
    }
  }
}
