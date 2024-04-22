import { Component, OnInit } from '@angular/core';
import {
  getElementSize,
  querySelector,
} from '../../../../../lib/utils/functions';
import { CalendarService } from '../../../../../lib/services/calendar/calendar.service';
import { format, isBetween } from '../../../../../lib/utils/moment';
import moment from 'moment';
import { interval } from 'rxjs';

@Component({
  standalone: true,
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

    interval(1000).subscribe(() => {
      const currentDate = new Date();
      const { startDate, endDate } = this.calendarService.subColumns();
      if (startDate && endDate && isBetween(currentDate, startDate, endDate)) {
        getElementSize(HOST).then(({ scrollWidth: width }) => {
          const oneSecondInSpace =
            moment(endDate).diff(startDate, 'seconds') / width;
          const leftTime = moment(currentDate).diff(startDate, 'seconds');
          marker.style.left = leftTime / oneSecondInSpace - 1 + 'px';
          marker.style.display = 'block';
          marker.setAttribute('title', format(currentDate, 'LLL'));
        });
      } else {
        marker.style.display = 'none';
      }
    });
  }
}
