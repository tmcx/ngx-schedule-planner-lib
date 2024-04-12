import { Component, OnInit } from '@angular/core';
import {
  getElementSize,
  querySelector,
} from '../../../../../lib/utils/functions';
import { CalendarService } from '../../../../../lib/services/calendar/calendar.service';
import { isBetween } from '../../../../../lib/utils/moment';
import moment from 'moment';

@Component({
  selector: 'app-marker',
  templateUrl: './marker.component.html',
  styleUrls: ['./marker.component.scss'],
})
export class MarkerComponent implements OnInit {
  constructor(private calendarService: CalendarService) {}

  async ngOnInit() {
    const uuid = this.calendarService.uuid;
    const marker = await querySelector(`#${uuid} app-right-panel app-marker`);
    setInterval(async () => {
      const currentDate = new Date();
      const { startDate, endDate } = this.calendarService.subColumns();
      if (startDate && endDate && isBetween(currentDate, startDate, endDate)) {
        const { scrollWidth: width } = await getElementSize(
          `#${uuid} app-right-panel`
        );
        const oneSecondInSpace =
          moment(endDate).diff(startDate, 'seconds') / width;
        const leftTime = moment(currentDate).diff(startDate, 'seconds');
        marker.style.left = leftTime / oneSecondInSpace - 1 + 'px';
        marker.style.display = 'block';
        marker.setAttribute('title', moment(currentDate).format('LLL'));
      } else {
        marker.style.display = 'none';
      }
    }, 1000);
  }
}
