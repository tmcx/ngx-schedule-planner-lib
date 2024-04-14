import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {
  ENavigationChange,
  TNavigationChange,
  EPeriod,
  IColumn,
  EMode,
  TMode,
} from '../../modules/right-panel/components/header/header.interface';
import {
  IProcessedContent,
  IProcessedCustomization,
} from '../../main/ngx-schedule-planner.interface';
import { ISelectedRange } from '../../modules/right-panel/components/body/body.interface';
import { uuid } from '../../utils/functions';
import { CONFIG } from '../../utils/constants';
import { ICalendarServiceEvents } from './calendar.interface';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  config: {
    activity: { factor: { width: string } };
    customization: IProcessedCustomization;
    referenceDate: Date;
    isLoading: boolean;
    columns: IColumn[];
    mode: TMode;
  };
  content: { all: IProcessedContent[]; filtered: IProcessedContent[] };
  on: ICalendarServiceEvents;
  uuid: string;

  constructor() {
    this.uuid = 'ngx-schedule-planner-' + uuid();
    this.on = {
      addActivityClick: new Subject(),
      navigationChange: new Subject(),
      contentChange: new Subject(),
      periodChange: new Subject(),
      selectRange: new Subject(),
      modeChange: new Subject(),
    };
    this.content = { all: [], filtered: [] };
    this.config = {
      activity: { factor: { width: '' } },
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
  }

  changeMode(mode: TMode, force = false) {
    if (this.config.mode !== mode || force) {
      this.config.mode = mode;
      this.on.modeChange.next(mode);
      this.on.navigationChange.next(ENavigationChange.mode);
      this.refreshWidthFactor();
    }
  }

  changeReferenceDate(date: Date) {
    this.config.referenceDate = date;
    this.changePeriod(EPeriod.referenceDate);
  }

  changeContent(content: IProcessedContent[], type: 'all' | 'filtered') {
    this.content[type] = content;
    this.on.contentChange.next(this.content);
  }

  addActivityClicked() {
    this.on.addActivityClick.next();
  }

  onRangeSelection(selectedRange: ISelectedRange) {
    this.on.selectRange.next(selectedRange);
  }

  private refreshWidthFactor() {
    this.config.activity.factor.width =
      CONFIG[this.config.mode].ACTIVITY.FACTOR.WIDTH;
  }

  setCustomization(customization: IProcessedCustomization) {
    this.config.customization = customization;
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
}
