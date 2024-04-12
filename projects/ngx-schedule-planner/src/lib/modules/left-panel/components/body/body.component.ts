import { AfterViewInit, Component } from '@angular/core';
import { IProcessedContent } from '../../../../main/ngx-schedule-planner.interface';
import { CalendarService } from '../../../../services/calendar/calendar.service';
import {
  clientHeight,
  querySelectorAll,
  setHeight,
} from '../../../../utils/functions';

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

    this.calendarService.onNavigationChange.subscribe(() => {
      this.resizeActivities();
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
    const rightPanelGroupsSelector = `#${uuid} app-right-panel app-body .user-groups .group`;
    const leftPanelGroupsSelector = `#${uuid} app-left-panel app-body .profile-group .group`;

    const activityGroups = await querySelectorAll(rightPanelGroupsSelector);
    const userGroups = await querySelectorAll(leftPanelGroupsSelector);

    for (let i = 0; i < userGroups.length; i++) {
      const activityGroup = activityGroups[i];
      const userGroup = userGroups[i];

      const activityGroupHeight = await clientHeight(activityGroup);
      const userGroupHeight = await clientHeight(userGroup);
      const container = (userGroup as any).parentElement;
      const userGroupsHeight = await clientHeight(container);
      const isLast =
        userGroup == container.querySelector('.group:last-of-type');

      if (isLast) {
        const remainingSpace =
          userGroupsHeight -
          (await clientHeight(
            Array.from(container.querySelectorAll('.group:not(:last-of-type)'))
          ));
        const size =
          activityGroupHeight > remainingSpace
            ? activityGroupHeight
            : remainingSpace;

        await setHeight(userGroup, size);
        await setHeight(activityGroup, size);
      } else {
        if (activityGroupHeight > userGroupHeight) {
          await setHeight(userGroup, activityGroupHeight);
        } else {
          await setHeight(activityGroup, userGroupHeight + 1);
        }
      }
    }
  }
}
