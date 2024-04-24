import { Component, OnInit } from '@angular/core';
import {
  getElementSize,
  querySelector,
} from '../../../../../lib/utils/functions';
import { CalendarService } from '../../../../../lib/services/calendar/calendar.service';
import { format, isBetween } from '../../../../../lib/utils/moment';
import moment from 'moment';
import { interval } from 'rxjs';
import { CONFIG } from '../../../../config/constants';

@Component({
  standalone: true,
  selector: 'app-marker',
  templateUrl: './marker.component.html',
  styleUrls: ['./marker.component.scss'],
})
export class MarkerComponent implements OnInit {
  startDate!: Date;
  endDate!: Date;

  constructor(private calendarService: CalendarService) {
    this.calendarService.on.event.subscribe(async ({ event }) => {
      if (CONFIG.eventGroups.SUB_COLUMNS.includes(event)) {
        const { startDate, endDate } = await this.calendarService.subColumns();
        this.startDate = startDate;
        this.endDate = endDate;
      }
    });
  }

  async ngOnInit() {
    const { BOTTOM_PANEL, APP_MARKER } = this.calendarService.selectors;
    const marker = await querySelector(APP_MARKER);
    var root = await querySelector(this.calendarService.selectors.HOST);

    interval(1000).subscribe(() => {
      const currentDate = new Date();
      if (
        this.startDate &&
        this.endDate &&
        isBetween(currentDate, this.startDate, this.endDate)
      ) {
        getElementSize(BOTTOM_PANEL).then(
          ({ scrollWidth: width, scrollHeight }) => {
            const leftPanelWidth = +root.style
              .getPropertyValue('--ngx-header-width')
              .split('px')[1];
            marker.style.height = scrollHeight + 'px';
            const oneSecondInSpace =
              moment(this.endDate).diff(this.startDate, 'seconds') /
              (width - leftPanelWidth);
            const leftTime = moment(currentDate).diff(
              this.startDate,
              'seconds'
            );
            marker.style.left =
              leftPanelWidth + (leftTime / oneSecondInSpace - 1) + 'px';
            marker.style.display = 'block';
            marker.setAttribute('title', format(currentDate, 'LLL'));
          }
        );
      } else {
        marker.style.display = 'none';
      }
    });
  }
}
