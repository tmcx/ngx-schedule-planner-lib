import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {
  EMode,
  ENavigationChange,
  EPeriod,
  IColumn,
  TMode,
  TNavigationChange,
} from '../../modules/calendar/header/components/header-grid/header-grid.interface';
import {
  ISelectedRange,
  IContent,
} from '../../main/ngx-schedule-planner.interface';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  onNavigationChange: Subject<TNavigationChange>;
  onSelectRange: Subject<ISelectedRange>;
  onAddActivityClick: Subject<void>;
  onPeriodChange: Subject<EPeriod>;
  onModeChange: Subject<TMode>;
  onContentChange: Subject<{ all: IContent[]; filtered: IContent[] }>;
  config: { referenceDate: Date; mode: TMode; columns: IColumn[] };
  content: { all: IContent[]; filtered: IContent[] };

  constructor() {
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
