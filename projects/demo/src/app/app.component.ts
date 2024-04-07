import { Component } from '@angular/core';
import { MOCK } from './mock';
import moment from 'moment';
import { IContent } from 'ngx-schedule-planner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  mock = this.format();

  log($event: any) {
    console.log($event);
  }

  format() {
    const content: IContent[] = JSON.parse(JSON.stringify(MOCK));
    content.forEach(({ groups }) => {
      groups.forEach((group) => {
        group.activities.forEach(({ startDate, endDate }) => {
          startDate = moment(new Date(startDate)).date(7).month(3).toDate();
          endDate = moment(new Date(endDate)).date(7).month(3).toDate();
          console.log({ startDate, endDate });
        });
      });
    });
    return content;
  }
}
