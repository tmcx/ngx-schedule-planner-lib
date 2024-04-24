import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {
  IActivity,
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
import { startOf } from '../../utils/moment';
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
import { IContent } from '../../../public-interfaces';
import { convertToCalendarContent } from '../../utils/convert-to-calendar-content';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  selectors: ICalendarSelectors;
  originalContent: IContent[];
  on: ICalendarServiceEvents;
  content: ICalendarContent[];
  config: ICalendarConfig;
  uuid: string;

  constructor() {
    this.originalContent = [];
    this.uuid = 'ngx-schedule-planner-' + uuid();
    this.selectors = {
      HOST: `#${this.uuid}`,
      APP_MARKER: `#${this.uuid} app-bottom-panel app-marker`,
      BOTTOM_PANEL: `#${this.uuid} app-bottom-panel`,
    };
    this.on = {
      event: new Subject(),
    };
    this.content = [];
    this.config = {
      activity: { factor: { width: '' } },
      leftPanel: { isCollapsed: false },
      referenceDate: new Date(),
      mode: EMode.monthly,
      customization: {},
      isLoading: false,
      columns: [],
      title: '',
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

  changeCurrentContent(originalContent?: IContent[]) {
    this.originalContent = originalContent ?? this.originalContent;
    const interval = setInterval(() => {
      const { startDate, endDate } = this.subColumns();
      if (startDate && endDate) {
        clearInterval(interval);
        this.content = convertToCalendarContent(this);
        this.on.event.next({ event: EEvent.contentChange, data: 'all' });
      }
    }, 10);
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
    this.changeCurrentContent();
    this.on.event.next({
      event: EEvent.contentChange,
      data: 'filtered',
    });
  }

  refreshTitle() {
    this.config.title = new ActivityHTML(this).calendarTitle();
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

  clickOnActivity(activity: IActivity) {
    const clonedActivity = clone(activity);
    delete clonedActivity.htmlContent;
    delete clonedActivity.style;
    this.on.event.next({
      event: EEvent.clickOnActivity,
      data: clonedActivity,
    });
  }
}
