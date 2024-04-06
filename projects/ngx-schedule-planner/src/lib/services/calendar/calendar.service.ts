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
  ISelectedRange,
  IContent,
} from '../../main/ngx-schedule-planner.interface';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  onContentChange: Subject<{ all: IContent[]; filtered: IContent[] }>;
  config: { referenceDate: Date; mode: TMode; columns: IColumn[] };
  content: { all: IContent[]; filtered: IContent[] };
  onNavigationChange: Subject<TNavigationChange>;
  onSelectRange: Subject<ISelectedRange>;
  onAddActivityClick: Subject<void>;
  onPeriodChange: Subject<EPeriod>;
  onModeChange: Subject<TMode>;
  uuid: string;

  constructor() {
    this.uuid = 'ngx-schedule-planner-' + Math.floor(Math.random() * 1000000000).toFixed(0);
    this.onNavigationChange = new Subject<TNavigationChange>();
    this.onSelectRange = new Subject<ISelectedRange>();
    this.onAddActivityClick = new Subject<void>();
    this.onContentChange = new Subject<{
      all: IContent[];
      filtered: IContent[];
    }>();
    this.onPeriodChange = new Subject<EPeriod>();
    this.onModeChange = new Subject<TMode>();
    this.content = { all: [], filtered: [] };
    this.config = {
      referenceDate: new Date(),
      mode: EMode.monthly,
      columns: [],
    };
  }

  changeNavigation(change: TNavigationChange) {
    this.onNavigationChange.next(change);
  }

  changePeriod(period: EPeriod) {
    this.onPeriodChange.next(period);
  }

  changeMode(mode: TMode) {
    if (this.config.mode !== mode) {
      this.config.mode = mode;
      this.onModeChange.next(mode);
      this.onNavigationChange.next(ENavigationChange.mode);
    }
  }

  changeReferenceDate(date: Date) {
    this.config.referenceDate = date;
    this.changePeriod(EPeriod.referenceDate);
  }

  changeContent(content: IContent[], type: 'all' | 'filtered') {
    this.content[type] = content;
    this.onContentChange.next(this.content);
  }

  addActivityClicked() {
    this.onAddActivityClick.next();
  }

  onRangeSelection(selectedRange: ISelectedRange) {
    this.onSelectRange.next(selectedRange);
  }
}
