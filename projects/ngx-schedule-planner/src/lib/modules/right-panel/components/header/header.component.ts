import { Component } from '@angular/core';
import { EMode, EPeriod, TMode } from '../header/header.interface';
import { CalendarService } from '../../../../services/calendar/calendar.service';
import { BaseVariables } from '../../../../utils/base-variables';
import { MonthlyCalendar } from '../../../../utils/monthly-calendar';
import { WeeklyCalendar } from '../../../../utils/weekly-calendar';
import { DailyCalendar } from '../../../../utils/daily-calendar';
import moment from 'moment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends BaseVariables {
  constructor(private calendarService: CalendarService) {
    super();
    this.loadModes();
    this.onSelectMode(this.calendarService.config.mode);
    this.calendarService.onModeChange.subscribe((mode) => {
      this.onSelectMode(mode);
      this.setMode();
    });
    this.calendarService.onPeriodChange.subscribe((period) => {
      this.setMode();
    });
    this.calendarService.config.columns = [];
  }

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

  modes!: { name: EMode; selected: boolean }[];

  loadModes(selectedMode: TMode = this.calendarService.config.mode) {
    this.modes = [
      { name: EMode.daily, selected: selectedMode == EMode.daily },
      { name: EMode.weekly, selected: selectedMode == EMode.weekly },
      { name: EMode.monthly, selected: selectedMode == EMode.monthly },
    ];
  }

  onSelectMode($event: any) {
    const mode: EMode =
      $event?.target?.value ?? $event ?? this.calendarService.config.mode;
    this.loadModes(mode);
    this.calendarService.changeMode(mode);
  }

  setPeriod(period: EPeriod) {
    const { referenceDate, mode } = this.calendarService.config;
    const unit = this.units[mode];
    let date = referenceDate;
    switch (period) {
      case EPeriod.previous:
        date = moment(referenceDate).subtract(1, unit).toDate();
        break;
      case EPeriod.today:
        date = new Date();
        break;
      case EPeriod.next:
        date = moment(referenceDate).add(1, unit).toDate();
        break;
    }
    this.calendarService.changeReferenceDate(date);
    this.calendarService.changePeriod(EPeriod.next);
  }

  onSelectDate($event: any) {
    const date = moment($event.target.value).toDate();
    this.calendarService.changeReferenceDate(date);
  }
}