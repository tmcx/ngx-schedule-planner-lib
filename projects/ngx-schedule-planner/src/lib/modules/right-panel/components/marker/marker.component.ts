import { Component, OnInit } from '@angular/core';
import {
  getElementSize,
  querySelector,
} from '../../../../../lib/utils/functions';
import { CalendarService } from '../../../../../lib/services/calendar/calendar.service';
import { format, isBetween } from '../../../../../lib/utils/moment';
import moment from 'moment';

@Component({
  selector: 'app-marker',
  templateUrl: './marker.component.html',
  styleUrls: ['./marker.component.scss'],
})
export class MarkerComponent implements OnInit {
  constructor(private calendarService: CalendarService) {}

  async ngOnInit() {
    const {
      RIGHT_PANEL: { HOST, APP_MARKER },
    } = this.calendarService.selectors;
    const marker = await querySelector(APP_MARKER);
    setInterval(async () => {
      const currentDate = new Date();
      const { startDate, endDate } = this.calendarService.subColumns();
      if (startDate && endDate && isBetween(currentDate, startDate, endDate)) {
        const { scrollWidth: width } = await getElementSize(HOST);
        const oneSecondInSpace =
          moment(endDate).diff(startDate, 'seconds') / width;
        const leftTime = moment(currentDate).diff(startDate, 'seconds');
        marker.style.left = leftTime / oneSecondInSpace - 1 + 'px';
        marker.style.display = 'block';
        marker.setAttribute('title', format(currentDate, 'LLL'));
      } else {
        marker.style.display = 'none';
      }
    }, 1000);
  }
}
