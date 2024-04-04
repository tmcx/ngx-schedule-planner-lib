import { Component, Input, OnInit } from '@angular/core';
import { IContent } from '../../../../../main/ngx-schedule-planner.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() userSchedule!: IContent;

  constructor() {}

  ngOnInit() {}
}
