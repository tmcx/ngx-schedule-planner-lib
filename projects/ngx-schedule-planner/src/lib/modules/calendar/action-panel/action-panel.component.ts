import { Component, OnInit } from '@angular/core';
import { BaseVariables } from '../../../utils/base-variables';
import { CalendarService } from '../../../services/calendar/calendar.service';
import { moment } from '../../../utils/moment';
import { EMode } from '../header-grid/header-grid.interface';

@Component({
  selector: 'app-action-panel',
  templateUrl: './action-panel.component.html',
  styleUrls: ['./action-panel.component.scss'],
})
export class ActionPanelComponent extends BaseVariables {
  title: string;

  constructor(private calendarService: CalendarService) {
    super();
    this.title = '';
    this.calendarService.onModeChange.subscribe(() => {
      this.setName();
    });
    this.calendarService.onPeriodChange.subscribe(() => {
      this.setName();
    });
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
        this.title = `${moment(referenceDate).format('YYYY, MMMM')}, ${
          week + 1
        } week`;
        break;
      case EMode.daily:
        this.title = moment(referenceDate).format('YYYY, MMMM, dddd D');
        break;
    }
  }
}
