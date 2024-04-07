import { AfterViewInit, Component } from '@angular/core';
import { IProcessedContent } from '../../../../main/ngx-schedule-planner.interface';
import { CalendarService } from '../../../../services/calendar/calendar.service';
import { querySelectorAll } from '../../../../utils/functions';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent implements AfterViewInit {
  content!: IProcessedContent[];

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
    const rightPanelGroupsSelector = `#${uuid} app-right-panel app-body .group`;
    const leftPanelGroupsSelector = `#${uuid} app-left-panel app-body .group`;

    const activities = await querySelectorAll(rightPanelGroupsSelector, true);
    const users = await querySelectorAll(leftPanelGroupsSelector, true);

    users.forEach((group, i) => {
      const activitiesHeight = activities[i].clientHeight;
      const groupsHeight = group.clientHeight;
      if (groupsHeight < activitiesHeight) {
        group.style.height = activitiesHeight + 'px';
      } else {
        activities[i].style.height = groupsHeight + 'px';
      }
    });
  }
}
