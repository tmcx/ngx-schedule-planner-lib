import { Component } from '@angular/core';
import { EMode } from './header-grid.interface';
import { CalendarService } from '../../../../../services/calendar/calendar.service';
import { BaseVariables } from '../../../../../utils/base-variables';
import { MonthlyCalendar } from '../../../../../utils/monthly-calendar';
import { WeeklyCalendar } from '../../../../../utils/weekly-calendar';
import { DailyCalendar } from '../../../../../utils/daily-calendar';

@Component({
  selector: 'app-header-grid',
  templateUrl: './header-grid.component.html',
  styleUrls: ['./header-grid.component.scss'],
})
export class HeaderGridComponent extends BaseVariables {
  constructor(private calendarService: CalendarService) {
    super();
    this.calendarService.onModeChange.subscribe(() => {
      this.setMode();
    });
    this.calendarService.onPeriodChange.subscribe((period) => {
      this.setMode();
    });
    this.calendarService.config.columns = [];
  }

  ngOnInit() {}

  setMode() {
    const { referenceDate, mode } = this.calendarService.config;
    switch (mode) {
      case EMode.monthly:
        this.calendarService.config.columns =
          MonthlyCalendar.getColumns(referenceDate);
        break;
      case EMode.weekly:
        this.calendarService.config.columns =
          WeeklyCalendar.getColumns(referenceDate);
        break;
      case EMode.daily:
        this.calendarService.config.columns =
          DailyCalendar.getColumns(referenceDate);
        break;
    }
  }

  get columns() {
    return this.calendarService.config.columns;
  }
}
