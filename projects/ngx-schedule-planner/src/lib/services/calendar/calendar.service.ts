import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {
  EMode,
  ENavigationChange,
  EPeriod,
  TMode,
  TNavigationChange,
} from '../../components/calendar/calendar.interface';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  onNavigationChange: Subject<TNavigationChange>;
  onPeriodChange: Subject<EPeriod>;
  onModeChange: Subject<EMode>;
  config: { referenceDate: Date; mode: TMode };

  constructor() {
    this.onNavigationChange = new Subject<TNavigationChange>();
    this.onPeriodChange = new Subject<EPeriod>();
    this.onModeChange = new Subject<EMode>();
    this.config = { referenceDate: new Date(), mode: EMode.monthly };
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
