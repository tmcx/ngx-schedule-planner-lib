import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { IProcessedContent } from '../../../../main/internal.interfaces';
import { EEvent } from '../../../../services/calendar/calendar.interface';
import { CalendarService } from '../../../../services/calendar/calendar.service';
import { ShortNamePipe } from '../../../../shared/pipes/short-name';
import { getElementSize, querySelectorAll, setHeight } from '../../../../utils/functions';
import { delay } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss'],
  imports: [ShortNamePipe, CommonModule],
})
export class LeftPanelComponent {
  content!: IProcessedContent[];

  constructor(private calendarService: CalendarService) {
    this.calendarService.on.event.pipe(delay(500)).subscribe(({ event }) => {
      if (event == EEvent.contentChange) {
        this.content = this.calendarService.content.filtered;
      }
      if (
        [EEvent.afterRefreshCalendarContent, EEvent.leftPanelCollapse].includes(
          event
        )
      ) {
        this.resizeActivities();
      }
    });
  }


  async resizeActivities() {
    this.calendarService.setLoading(true);
    const {
      LEFT_PANEL: { GROUPS: L_GROUPS },
      RIGHT_PANEL: { GROUPS: R_GROUPS },
    } = this.calendarService.selectors;

    const lGroups = await querySelectorAll(L_GROUPS);
    const rGroups = await querySelectorAll(R_GROUPS);
    await setHeight(rGroups, 'auto');
    await setHeight(lGroups, 'auto');

    for (let i = 0; i < lGroups.length; i++) {
      const leftPanelGroup = lGroups[i];
      const rightPanelGroup = rGroups[i];
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
