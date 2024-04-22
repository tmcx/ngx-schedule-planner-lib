import { AfterViewInit, Component } from '@angular/core';
import { IProcessedContent } from '../../../../main/internal.interfaces';
import { CalendarService } from '../../../../services/calendar/calendar.service';
import {
  getElementSize,
  querySelectorAll,
  setHeight,
} from '../../../../utils/functions';
import { EEvent } from '../../../../services/calendar/calendar.interface';
import { ShortNamePipe } from '../../../../shared/pipes/short-name';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
  imports: [ShortNamePipe, CommonModule],
})
export class BodyComponent implements AfterViewInit {
  content!: IProcessedContent[];

  constructor(private calendarService: CalendarService) {
    this.calendarService.on.event.subscribe(({ event }) => {
      if (event == EEvent.contentChange) {
        this.content = this.calendarService.content.filtered;
      }
      if (
        [
          EEvent.navigation,
          EEvent.afterRefreshCalendarContent,
          EEvent.leftPanelCollapse,
        ].includes(event)
      ) {
        this.resizeActivities();
      }
    });
  }

  ngAfterViewInit(): void {}

  async resizeActivities() {
    this.calendarService.setLoading(true);
    const {
      LEFT_PANEL: { PROFILE_GROUPS },
      RIGHT_PANEL: { USER_GROUPS },
    } = this.calendarService.selectors;

    const profiles = await querySelectorAll(PROFILE_GROUPS);
    const userGroupsEls = await querySelectorAll(USER_GROUPS);
    const groups = await Promise.all(
      profiles.map(async (profile, i) => {
        const userSchedule = userGroupsEls[i];
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
