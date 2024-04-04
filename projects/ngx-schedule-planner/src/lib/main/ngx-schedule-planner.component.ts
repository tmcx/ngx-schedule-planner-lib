import { Component, Input, OnInit } from '@angular/core';
import { CalendarService } from '../services/calendar/calendar.service';
import { moment } from '../utils/moment';
import { IContent } from './ngx-schedule-planner.interface';
import { EMode } from '../modules/calendar/header/components/header-grid/header-grid.interface';

@Component({
  selector: 'ngx-schedule-planner',
  templateUrl: './ngx-schedule-planner.component.html',
  styleUrls: ['./ngx-schedule-planner.component.scss'],
})
export class NgxSchedulePlannerComponent implements OnInit {
  @Input() set content(content: IContent[]) {
    this.calendarService.changeContent(content, 'all');
    this.calendarService.changeContent(content, 'filtered');
  }

  constructor(private calendarService: CalendarService) {}

  ngOnInit(): void {
    this.calendarService.changeMode(EMode.weekly);
    const referenceDate = moment(new Date()).clone().add(17, 'd').toDate();
    this.calendarService.changeReferenceDate(referenceDate);
  }
}
