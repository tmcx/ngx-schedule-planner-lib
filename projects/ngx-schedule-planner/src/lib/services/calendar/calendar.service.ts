import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {
  EMode,
  ENavigationChange,
  EPeriod,
  IColumn,
  TMode,
  TNavigationChange,
} from '../../modules/calendar/header-grid/header-grid.interface';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  onNavigationChange: Subject<TNavigationChange>;
  onPeriodChange: Subject<EPeriod>;
  onModeChange: Subject<EMode>;
  config: { referenceDate: Date; mode: TMode; columns: IColumn[] };

  constructor() {
    this.onNavigationChange = new Subject<TNavigationChange>();
    this.onPeriodChange = new Subject<EPeriod>();
    this.onModeChange = new Subject<EMode>();
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

  changeMode(mode: EMode) {
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
}
