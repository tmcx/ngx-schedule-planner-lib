import { Component, OnInit } from '@angular/core';
import { IContent } from '../../../../../main/ngx-schedule-planner.interface';
import { CalendarService } from '../../../../../services/calendar/calendar.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent implements OnInit {
  content!: IContent[];

  constructor(private calendarService: CalendarService) {
    this.calendarService.onContentChange.subscribe((content) => {
      this.content = content.filtered;
    });
  }

  ngOnInit() {}
}
