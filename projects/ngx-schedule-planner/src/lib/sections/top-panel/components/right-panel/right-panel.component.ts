import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InputCalendarComponent } from '../../../../shared/inputs/input-calendar/input-calendar.component';
import { CalendarService } from '../../../../services/calendar/calendar.service';
import { EMode, EPeriod, IColumn, TModes } from './right-panel.interface';
import { EEvent } from '../../../../services/calendar/calendar.interface';
import { addToDate } from '../../../../utils/moment';
import moment from 'moment';

@Component({
  standalone: true,
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.scss'],
  imports: [InputCalendarComponent, CommonModule],
})
export class RightPanelComponent {
  columns: IColumn[];
  period = EPeriod;
  modes: TModes;

  constructor(public calendarService: CalendarService) {
    this.columns = [];
    this.modes = [
      [EMode.daily, 'day'],
      [EMode.weekly, 'week'],
      [EMode.monthly, 'month'],
    ];
    this.calendarService.on.event.subscribe(({ event }) => {
      if ([EEvent.mode, EEvent.period, EEvent.referenceDate].includes(event)) {
        this.columns = this.calendarService.config.columns;
      }
    });
  }

  onSelectMode($event: any) {
    const mode: EMode =
      $event?.target?.value ?? $event ?? this.calendarService.config.mode;
    this.calendarService.changeMode(mode);
  }

  setPeriod(period: EPeriod) {
    const { referenceDate, mode } = this.calendarService.config;
    const unit = this.modes.find(({ '0': m }) => m === mode)![1];
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
