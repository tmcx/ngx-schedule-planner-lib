import { Component } from '@angular/core';
import {
  EMode,
  ENavigationChange,
  EPeriod,
  TMode,
} from '../calendar/calendar.interface';
import { CalendarService } from '../../services/calendar/calendar.service';
import { moment } from '../../utils/moment';
import { BaseVariables } from '../../utils/base-variables';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent extends BaseVariables {
  modes!: { name: EMode; selected: boolean }[];
  title: string;

  constructor(private calendarService: CalendarService) {
    super();
    this.title = '';
    this.loadModes();
    this.onSelectMode(this.calendarService.config.mode);
    this.calendarService.onNavigationChange.subscribe((change) => {
      if (change == ENavigationChange.mode) {
        this.setName();
      }
    });
    this.calendarService.onModeChange.subscribe((mode) => {
      this.onSelectMode(mode);
      this.setName();
    });
    this.calendarService.onPeriodChange.subscribe(() => {
      this.setName();
    });
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

  setName() {
    const referenceDate = this.calendarService.config.referenceDate;
    switch (this.calendarService.config.mode) {
      case EMode.monthly:
        this.title = moment(referenceDate).format('YYYY, MMMM');
        break;
      case EMode.weekly:
        const week =
          moment(referenceDate).week() -
          moment(referenceDate).startOf('M').week();
        this.title = `${moment(referenceDate).format(
          'YYYY, MMMM'
        )}, ${week} week`;
        break;
      case EMode.daily:
        this.title = moment(referenceDate).format('YYYY, MMMM, dddd D');
        break;
    }
  }

  setPeriod(period: EPeriod) {
    const { referenceDate, mode } = this.calendarService.config;
    const unit = this.units[mode];
    let date = referenceDate;
    switch (period) {
      case EPeriod.previous:
        date = moment(referenceDate).subtract(1, unit).toDate();
        break;
      case EPeriod.next:
        date = moment(referenceDate).add(1, unit).toDate();
        break;
    }
    this.calendarService.changeReferenceDate(date);
    this.calendarService.changePeriod(EPeriod.next);
  }
}
