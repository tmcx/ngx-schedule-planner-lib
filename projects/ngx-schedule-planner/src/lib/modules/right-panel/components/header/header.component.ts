import { Component } from '@angular/core';
import { EMode, EPeriod, IUnit, TMode } from './header.interface';
import { CalendarService } from '../../../../services/calendar/calendar.service';
import { MonthlyCalendar } from '../../../../utils/monthly-calendar';
import { WeeklyCalendar } from '../../../../utils/weekly-calendar';
import { DailyCalendar } from '../../../../utils/daily-calendar';
import { addToDate, startOf } from '../../../../utils/moment';
import moment from 'moment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  units: IUnit = {
    [EMode.monthly]: 'month',
    [EMode.weekly]: 'week',
    [EMode.daily]: 'day',
  };
  period = EPeriod;
  constructor(private calendarService: CalendarService) {
    this.loadModes();
    this.onSelectMode(this.calendarService.config.mode);
    this.calendarService.on.modeChange.subscribe((mode) => {
      this.onSelectMode(mode);
      this.setMode();
    });
    this.calendarService.on.periodChange.subscribe(() => {
      this.setMode();
    });
    this.calendarService.config.columns = [];
  }

  setMode() {
    const { referenceDate, mode } = this.calendarService.config;
    switch (mode) {
      case EMode.monthly:
        this.calendarService.config.columns = MonthlyCalendar.getColumns(
          startOf(referenceDate, 'month')
        );
        break;
      case EMode.weekly:
        this.calendarService.config.columns = WeeklyCalendar.getColumns(
          startOf(referenceDate, 'week')
        );
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
        date = addToDate(referenceDate, { [unit]: 1 });
        break;
    }
    this.calendarService.changeReferenceDate(date);
    this.calendarService.changePeriod(EPeriod.next);
    this.calendarService.changeNavigation(EPeriod.next);
  }

  onSelectDate($event: any) {
    const date = moment($event.target.value).toDate();
    this.calendarService.changeReferenceDate(date);
  }
}
