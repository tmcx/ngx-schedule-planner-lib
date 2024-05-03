import { Component } from '@angular/core';
import { MOCK } from './mock';
import moment from 'moment';
import { ICustomization } from 'ngx-schedule-planner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  mock = this.format();
  customization: ICustomization;
  referencedDate = moment(new Date()).date(30).month(3).toDate();

  constructor() {
    this.customization = {
      CALENDAR: {
        ACTIVITY: {
          INLINE_SHOW: [
            {
              type: 'text',
              valuePath: 'name',
              isArray: false,
            },
            {
              type: 'date',
              valuePath: 'startDate',
              format: 'HH:mm',
              isArray: false,
            },
            {
              type: 'date',
              valuePath: 'endDate',
              format: 'HH:mm',
              isArray: false,
            },
          ],
        },
      },
    };
  }

  log($event: any) {
    console.log($event);
  }

  format() {
    return MOCK;
  }
}
