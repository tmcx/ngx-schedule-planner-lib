import { Component } from '@angular/core';
import {
  EMode,
  ENavigationChange,
  EPeriod,
  TMode,
} from '../header-grid/header-grid.interface';
import { CalendarService } from '../../../services/calendar/calendar.service';
import { BaseVariables } from '../../../utils/base-variables';
import { moment } from '../../../utils/moment';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent extends BaseVariables {
  modes!: { name: EMode; selected: boolean }[];

  constructor(private calendarService: CalendarService) {
    super();
    this.loadModes();
    this.onSelectMode(this.calendarService.config.mode);
    this.calendarService.onModeChange.subscribe((mode) => {
      this.onSelectMode(mode);
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
