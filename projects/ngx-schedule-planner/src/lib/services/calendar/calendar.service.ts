import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {
  EMode,
  ENavigationChange,
  EPeriod,
  IColumn,
  TMode,
  TNavigationChange,
} from '../../modules/right-panel/components/header/header.interface';
import {
  IProcessedContent,
  IProcessedCustomization,
} from '../../main/ngx-schedule-planner.interface';
import { ISelectedRange } from '../../modules/right-panel/components/body/body.interface';
import { uuid } from '../../utils/functions';
import { CONFIG } from '../../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  onContentChange: Subject<{
    all: IProcessedContent[];
    filtered: IProcessedContent[];
  }>;
  config: {
    referenceDate: Date;
    mode: TMode;
    columns: IColumn[];
    activity: { factor: { width: string } };
    customization: IProcessedCustomization;
    isLoading: boolean;
  };
  content: { all: IProcessedContent[]; filtered: IProcessedContent[] };
  onNavigationChange: Subject<TNavigationChange>;
  onSelectRange: Subject<ISelectedRange>;
  onAddActivityClick: Subject<void>;
  onPeriodChange: Subject<EPeriod>;
  onModeChange: Subject<TMode>;
  uuid: string;

  constructor() {
    this.uuid = 'ngx-schedule-planner-' + uuid();
    this.onNavigationChange = new Subject<TNavigationChange>();
    this.onSelectRange = new Subject<ISelectedRange>();
    this.onAddActivityClick = new Subject<void>();
    this.onContentChange = new Subject<{
      all: IProcessedContent[];
      filtered: IProcessedContent[];
    }>();
    this.onPeriodChange = new Subject<EPeriod>();
    this.onModeChange = new Subject<TMode>();
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
    this.onNavigationChange.next(change);
  }

  changePeriod(period: EPeriod) {
    this.onPeriodChange.next(period);
  }

  changeMode(mode: TMode, force = false) {
    if (this.config.mode !== mode || force) {
      this.config.mode = mode;
      this.onModeChange.next(mode);
      this.onNavigationChange.next(ENavigationChange.mode);
      this.refreshWidthFactor();
    }
  }

  changeReferenceDate(date: Date) {
    this.config.referenceDate = date;
    this.changePeriod(EPeriod.referenceDate);
  }

  changeContent(content: IProcessedContent[], type: 'all' | 'filtered') {
    this.content[type] = content;
    this.onContentChange.next(this.content);
  }

  addActivityClicked() {
    this.onAddActivityClick.next();
  }

  onRangeSelection(selectedRange: ISelectedRange) {
    this.onSelectRange.next(selectedRange);
  }

  private refreshWidthFactor() {
    let WIDTH_FACTOR = '';

    switch (this.config.mode) {
      case EMode.monthly:
        WIDTH_FACTOR = CONFIG.MONTHLY.ACTIVITY.FACTOR.WIDTH;
        break;
      case EMode.weekly:
        WIDTH_FACTOR = CONFIG.WEEKLY.ACTIVITY.FACTOR.WIDTH;
        break;
      case EMode.daily:
        WIDTH_FACTOR = CONFIG.DAILY.ACTIVITY.FACTOR.WIDTH;
        break;
    }
    this.config.activity.factor.width = WIDTH_FACTOR;
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
