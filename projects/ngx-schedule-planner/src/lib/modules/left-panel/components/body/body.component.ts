import { AfterViewInit, Component } from '@angular/core';
import { IProcessedContent } from '../../../../main/internal.interfaces';
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

    this.calendarService.on.leftPanelCollapse.subscribe(() => {
      this.resizeActivities();
    });
  }

  ngAfterViewInit(): void {
    this.resizeActivities();
  }

  async resizeActivities() {
    this.calendarService.setLoading(true);
    const {
      LEFT_PANEL: { PROFILE_GROUPS },
      RIGHT_PANEL: { USER_GROUPS },
    } = this.calendarService.selectors;

    const profiles = await querySelectorAll(PROFILE_GROUPS);
    const userGroups = await querySelectorAll(USER_GROUPS);
    const groups = await Promise.all(
      profiles
        .map((profile, i) => [profile, userGroups[i]])
        .map(async ([profile, userSchedule]) => {
          const profileGroups = await querySelectorAll('.group', {
            parent: profile,
          });

          const userGroups = await querySelectorAll('.group', {
            parent: userSchedule,
          });
          profileGroups.forEach(async (profileGroup) => {
            await setHeight(profileGroup, 'auto', '');
          });
          userGroups.forEach(async (profileGroup) => {
            await setHeight(profileGroup, 'auto', '');
          });
          return profileGroups.map((profileGroup, i) => [
            profileGroup,
            userGroups[i],
          ]);
        })
    );

    for (const [leftPanelGroup, rightPanelGroup] of groups.flat()) {
      const { clientHeight: leftGroupHeight } = await getElementSize(
        leftPanelGroup
      );
      const { clientHeight: rightGroupHeight } = await getElementSize(
        rightPanelGroup
      );
      if (leftGroupHeight > rightGroupHeight) {
        setHeight(rightPanelGroup, leftGroupHeight);
      } else if (leftGroupHeight < rightGroupHeight) {
        setHeight(leftPanelGroup, rightGroupHeight);
      }
    }
    this.calendarService.setLoading(false);
  }

  get isCollapsed() {
    return this.calendarService.config.leftPanel.isCollapsed;
  }
}
