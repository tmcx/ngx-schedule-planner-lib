import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../services/calendar/calendar.service';
import { EMode } from '../components/calendar/calendar.interface';
import { moment } from '../utils/moment';

@Component({
  selector: 'ngx-schedule-planner',
  templateUrl: './ngx-schedule-planner.component.html',
  styleUrls: ['./ngx-schedule-planner.component.scss'],
})
export class NgxSchedulePlannerComponent implements OnInit {
  constructor(private calendarService: CalendarService) {}

  ngOnInit(): void {
    this.calendarService.changeMode(EMode.monthly);

    const referenceDate = moment(new Date()).clone().add(17, 'd').toDate();
    this.calendarService.changeReferenceDate(referenceDate);
  }
}
