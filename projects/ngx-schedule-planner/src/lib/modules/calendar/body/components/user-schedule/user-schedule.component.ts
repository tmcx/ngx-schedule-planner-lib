import { Component, Input, OnInit } from '@angular/core';
import { IContent } from '../../../../../main/ngx-schedule-planner.interface';

@Component({
  selector: 'app-user-schedule',
  templateUrl: './user-schedule.component.html',
  styleUrls: ['./user-schedule.component.scss'],
})
export class UserScheduleComponent implements OnInit {
  @Input() userSchedule!: IContent;

  constructor() {}

  ngOnInit() {}
}
