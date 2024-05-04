import { Component, OnInit } from '@angular/core';
import {
  getElementSize,
  querySelector,
} from '../../../../../lib/utils/functions';
import { CalendarService } from '../../../../../lib/services/calendar/calendar.service';
import { format, isBetween } from '../../../../../lib/utils/moment';
import moment from 'moment';
import { interval } from 'rxjs';
import { CONFIG, HEADER_STYLE, SELECTOR } from '../../../../config/constants';
import { StyleProcessor } from '../../../../utils/style-processor';
import { EEvent } from '../../../../services/calendar/calendar.interface';

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
    this.calendarService.on.event.subscribe(({ event }) => {
      if (CONFIG.eventGroups.SUB_COLUMNS.includes(event)) {
        ({
          global: { startDate: this.startDate, endDate: this.endDate },
        } = this.calendarService.config.interval);
      }
      if (event == EEvent.leftPanelCollapse) {
        this.triggerEvaluation();
      }
    });
  }

  async ngOnInit() {
    interval(1000).subscribe(() => {
      this.triggerEvaluation();
    });
  }

  async triggerEvaluation() {
    const { BOTTOM_PANEL, APP_MARKER } = SELECTOR;
    const marker = await querySelector(APP_MARKER);
    marker.style.display = 'none';
    const currentDate = new Date();
    if (isBetween(currentDate, this.startDate, this.endDate)) {
      getElementSize(BOTTOM_PANEL).then(
        async ({ scrollWidth: width, scrollHeight }) => {
          const leftPanelWidth = +(
            await StyleProcessor.getProp(HEADER_STYLE.STYLE_VAR.WIDTH)
          ).split('px')[0];
          marker.style.height = scrollHeight + 'px';
          const oneSecondInSpace =
            moment(this.endDate).diff(this.startDate, 'seconds') /
            (width - leftPanelWidth);
          const leftTime = moment(currentDate).diff(this.startDate, 'seconds');
          marker.style.left =
            leftPanelWidth + (leftTime / oneSecondInSpace - 1) + 'px';
          marker.style.display = 'block';
          marker.setAttribute('title', format(currentDate, 'LLL'));
        }
      );
    } else {
      marker.style.display = 'none';
    }
  }
}
