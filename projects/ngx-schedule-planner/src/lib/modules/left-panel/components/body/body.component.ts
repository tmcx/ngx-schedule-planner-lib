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
    const rightPanelGroupsSelector = (num: number) =>
      `#${uuid} app-right-panel app-body .user-groups:nth-of-type(${num}) .group`;
    const leftPanelGroupsSelector = (num: number) =>
      `#${uuid} app-left-panel app-body .profile-group:nth-of-type(${num}) .group`;
    const leftPanelProfilesSelector = `#${uuid} app-left-panel app-body .profile-group`;

    const profiles = await querySelectorAll(leftPanelProfilesSelector, true);

    for (let index = 0; index < profiles.length; index++) {
      const profile = profiles[index];

      const userGroups = await querySelectorAll(
        leftPanelGroupsSelector(index + 1),
        true
      );
      const activityGroups = await querySelectorAll(
        rightPanelGroupsSelector(index + 1),
        true
      );

      const userProfileHeight = profile.clientHeight;
      const userProfileGroupsHeight = userGroups.reduce(
        (prev, curr) => curr.clientHeight + prev,
        0
      );
      const userActivitiesHeight = activityGroups.reduce(
        (prev, curr) => curr.clientHeight + prev,
        0
      );

      userGroups.forEach((group, i) => {
        const activitiesHeight = activityGroups[i].clientHeight;
        const groupsHeight = group.clientHeight;

        const isLast = i == userGroups.length - 1;
        if (!isLast) {
          if (groupsHeight < activitiesHeight) {
            group.style.height = activitiesHeight + 'px';
          } else {
            activityGroups[i].style.height = groupsHeight + 1 + 'px';
          }
        }

        if (isLast) {
          const refHeight =
            userProfileHeight < userActivitiesHeight
              ? userActivitiesHeight
              : userProfileHeight;
          const lastGroupHeight =
            userGroups.length == 1
              ? refHeight
              : refHeight - userProfileGroupsHeight + userGroups.length;
          group.style.height = lastGroupHeight + 'px';
          activityGroups[i].style.height = lastGroupHeight + 'px';
        }
      });
    }
  }
}
