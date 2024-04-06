import { AfterViewInit, Component } from '@angular/core';
import { IContent } from '../../../../main/ngx-schedule-planner.interface';
import { CalendarService } from '../../../../services/calendar/calendar.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent implements AfterViewInit {
  content!: IContent[];

  constructor(private calendarService: CalendarService) {
    this.calendarService.onContentChange.subscribe((content) => {
      this.content = content.filtered;
    });
  }

  ngAfterViewInit(): void {
    this.calendarService.onContentChange.subscribe(() => {
      this.resizeActivities();
    });
    this.resizeActivities();
  }

  async resizeActivities() {
    const { uuid } = this.calendarService;
    const getActivities = () =>
      document.querySelectorAll(
        `#${uuid} app-right-panel app-body .group`
      ) as unknown as HTMLElement[];

    await new Promise<void>((resolve) => {
      const interval = setInterval(() => {
        const activities = getActivities();
        if (activities) {
          resolve();
          clearInterval(interval);
        }
      }, 100);
    });
    const activities = getActivities();

    const users = document.querySelectorAll(
      `#${uuid} app-left-panel app-body .group`
    );

    users.forEach((group, i) => {
      activities[i].style.height = group.clientHeight + 'px';
    });
  }
}
