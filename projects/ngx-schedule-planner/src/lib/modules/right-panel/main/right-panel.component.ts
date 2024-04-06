import { AfterViewInit, Component } from '@angular/core';
import { CalendarService } from '../../../services/calendar/calendar.service';

@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.scss'],
})
export class RightPanelComponent implements AfterViewInit {
  constructor(private calendarService: CalendarService) {}

  ngAfterViewInit(): void {
    const { uuid } = this.calendarService;
    const observer = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const { width } = entry.contentRect;
        const navigator = document.querySelector(
          `#${uuid} app-right-panel app-header .navigator`
        ) as HTMLElement;
        const title = document.querySelector(
          `#${uuid} app-right-panel app-header .title`
        ) as HTMLElement;
        navigator.style.width = width + 'px';
        title.style.width = width + 'px';
      });
    });

    observer.observe(document.querySelector(`#${uuid} app-right-panel`)!);
  }
}
