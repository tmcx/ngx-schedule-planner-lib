import { AfterViewInit, Component } from '@angular/core';
import { IProcessedContent } from '../../../../main/ngx-schedule-planner.interface';
import { CalendarService } from '../../../../services/calendar/calendar.service';
import {
  getElementSize,
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
    this.calendarService.on.contentChange.subscribe((content) => {
      this.content = content.filtered;
      this.resizeActivities();
    });

    this.calendarService.on.navigationChange.subscribe(() => {
      this.resizeActivities();
    });
  }

  ngAfterViewInit(): void {
    this.resizeActivities();
  }

  async resizeActivities() {
    const {
      LEFT_PANEL: { GROUPS: L_GROUPS },
      RIGHT_PANEL: { GROUPS: R_GROUPS },
    } = this.calendarService.selectors;

    const activityGroups = await querySelectorAll(R_GROUPS);
    const userGroups = await querySelectorAll(L_GROUPS);

    for (let i = 0; i < userGroups.length; i++) {
      const activityGroup = activityGroups[i];
      const userGroup = userGroups[i];

      const { clientHeight: activityGroupHeight } = await getElementSize(
        activityGroup
      );
      const { clientHeight: userGroupHeight } = await getElementSize(userGroup);
      const container = (userGroup as any).parentElement;
      const { clientHeight: userGroupsHeight } = await getElementSize(
        container
      );
      const isLast =
        userGroup == container.querySelector('.group:last-of-type');

      if (isLast) {
        const { clientHeight: restOfGroupHeight } = await getElementSize(
          Array.from(container.querySelectorAll('.group:not(:last-of-type)'))
        );
        const remainingSpace = userGroupsHeight - restOfGroupHeight;
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

  get isCollapsed() {
    return this.calendarService.config.leftPanel.isCollapsed;
  }
}
