import { Component } from '@angular/core';
import { MOCK } from './mock';
import moment from 'moment';
import { IContent, ICustomization } from 'ngx-schedule-planner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  mock = this.format();
  customization: ICustomization;
  referencedDate = moment(new Date()).date(9).toDate();

  constructor() {
    this.customization = {
      CALENDAR: {
        ACTIVITY: {
          INLINE_SHOW: [
            {
              type: 'icon-text',
              valuePath: 'assistants',
              isArray: false,
            },
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
    const content: IContent[] = JSON.parse(JSON.stringify(MOCK));
    content.forEach(({ groups }) => {
      groups.forEach((group) => {
        group.activities.forEach((activity) => {
          activity.startDate = moment(new Date(activity.startDate))
            .month(3)
            .toDate();
          activity.endDate = moment(new Date(activity.endDate))
            .month(3)
            .toDate();
          activity['assistants'] = {
            icon: '🙋‍♂️',
            text: '3',
          };
        });
      });
    });
    return content;
  }
}
