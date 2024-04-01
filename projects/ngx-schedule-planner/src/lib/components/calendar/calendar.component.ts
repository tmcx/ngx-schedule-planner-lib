import { Component } from '@angular/core';
import { EMode, IColumn } from './calendar.interface';
import { MonthlyCalendar } from '../../utils/monthly-calendar';
import { WeeklyCalendar } from '../../utils/weekly-calendar';
import { DailyCalendar } from '../../utils/daily-calendar';
import { CalendarService } from '../../services/calendar/calendar.service';
import { BaseVariables } from '../../utils/base-variables';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent extends BaseVariables {
  columns: IColumn[];

  constructor(private calendarService: CalendarService) {
    super();
    this.calendarService.onModeChange.subscribe(() => {
      this.setMode();
    });
    this.calendarService.onPeriodChange.subscribe((period) => {
      this.setMode();
    });
    this.columns = [];
  }

  ngOnInit() {}

  setMode() {
    const { referenceDate, mode } = this.calendarService.config;
    switch (mode) {
      case EMode.monthly:
        this.columns = MonthlyCalendar.getColumns(referenceDate);
        break;
      case EMode.weekly:
        this.columns = WeeklyCalendar.getColumns(referenceDate);
        break;
      case EMode.daily:
        this.columns = DailyCalendar.getColumns(referenceDate);
        break;
    }
  }
}
