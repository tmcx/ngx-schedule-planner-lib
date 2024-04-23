import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InputCalendarComponent } from '../../../../shared/inputs/input-calendar/input-calendar.component';
import { EMode, EPeriod, IUnit, TMode } from './right-panel.interface';
import { CalendarService } from '../../../../services/calendar/calendar.service';
import moment from 'moment';
import { addToDate } from '../../../../utils/moment';

@Component({
  standalone: true,
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.scss'],
  imports: [InputCalendarComponent, CommonModule],
})
export class RightPanelComponent {
  modes!: { name: EMode; selected: boolean }[];
  units: IUnit = {
    [EMode.monthly]: 'month',
    [EMode.weekly]: 'week',
    [EMode.daily]: 'day',
  };
  period = EPeriod;
  constructor(public calendarService: CalendarService) {
    this.loadModes();
    this.onSelectMode(this.calendarService.config.mode);
    this.calendarService.config.columns = [];
  }

  get columns() {
    return this.calendarService.config.columns;
  }

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
        this.calendarService.changeNavigation(EPeriod.previous);
        break;
      case EPeriod.today:
        date = new Date();
        break;
      case EPeriod.next:
        date = addToDate(referenceDate, { [unit]: 1 });
        this.calendarService.changeNavigation(EPeriod.next);
        break;
    }
    this.calendarService.changeReferenceDate(date);
    this.calendarService.changePeriod(period);
  }

  onSelectDate(date: Date) {
    this.calendarService.changeReferenceDate(date);
  }

}
