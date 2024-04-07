import { AfterViewInit, Component } from '@angular/core';
import { CalendarService } from '../../../services/calendar/calendar.service';
import { querySelector } from '../../../utils/functions';

@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.scss'],
})
export class RightPanelComponent implements AfterViewInit {
  constructor(private calendarService: CalendarService) {}

  async ngAfterViewInit(): Promise<void> {
    const { uuid } = this.calendarService;
    const observer = new ResizeObserver((entries) => {
      entries.forEach(async (entry) => {
        const { width } = entry.contentRect;
        const navigator = await querySelector(
          `#${uuid} app-right-panel app-header .navigator`
        );
        const title = await querySelector(
          `#${uuid} app-right-panel app-header .title`
        );
        navigator.style.width = width + 'px';
        title.style.width = width + 'px';
      });
    });

    observer.observe(await querySelector(`#${uuid} app-right-panel`));
  }
}
