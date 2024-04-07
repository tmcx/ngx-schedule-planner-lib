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
import { IProcessedContent } from '../../main/ngx-schedule-planner.interface';
import { ISelectedRange } from '../../modules/right-panel/components/body/body.interface';
import { uuid } from '../../utils/functions';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  onContentChange: Subject<{
    all: IProcessedContent[];
    filtered: IProcessedContent[];
  }>;
  config: { referenceDate: Date; mode: TMode; columns: IColumn[] };
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
}
