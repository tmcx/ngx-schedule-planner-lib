import { AfterViewInit, Component, HostListener } from '@angular/core';
import { CalendarService } from '../../../services/calendar/calendar.service';
import { linkScroll, linkSize } from '../../../utils/functions';
import { MarkerComponent } from '../components/marker/marker.component';
import { RightPanelComponent } from '../components/right-panel/right-panel.component';
import { LeftPanelComponent } from '../components/left-panel/left-panel.component';
import { ShortNamePipe } from '../../../shared/pipes/short-name';
import { CommonModule } from '@angular/common';
import { IGroup, IProcessedContent } from '../../../main/internal.interfaces';
import { EEvent, ICalendarContent } from '../../../services/calendar/calendar.interface';
import { delay } from 'rxjs';
import { ICreatingActivity } from './bottom-panel.interface';
import { isBetween } from '../../../utils/moment';

@Component({
  standalone: true,
  selector: 'app-bottom-panel',
  templateUrl: './bottom-panel.component.html',
  styleUrls: ['./bottom-panel.component.scss'],
  imports: [ShortNamePipe, LeftPanelComponent, RightPanelComponent, MarkerComponent,CommonModule],
})
export class BottomPanelComponent implements AfterViewInit {
  content!: ICalendarContent;

  constructor(private calendarService: CalendarService) {
    this.calendarService.on.event.pipe(delay(500)).subscribe(({ event }) => {
      if (EEvent.contentChange == event) {
        this.content = this.calendarService.content;
        this.calendarService.on.event.next({
          event: EEvent.afterRefreshCalendarContent,
        });
      }
    });
    this.resetCreatingActivity();
  }

  get isCollapsed() {
    return this.calendarService.config.leftPanel.isCollapsed;
  }

















  creatingActivity!: ICreatingActivity;



  get subColumns() {
    return this.calendarService.subColumns();
  }

  addActivity(
    type: 'start' | 'end' | 'enter' | 'leave',
    userSchedule: IProcessedContent,
    group: IGroup,
    refDate: Date
  ) {
    switch (type) {
      case 'start':
        this.creatingActivity = {
          profile: userSchedule.profile,
          fromRefDate: refDate,
          toRefDate: refDate,
          isCreating: true,
          group: group,
        };
        break;
      case 'enter':
        if (
          this.creatingActivity.isCreating &&
          this.creatingActivity.group === group
        ) {
          this.creatingActivity.toRefDate = refDate;
        }
        break;
      case 'end':
        if (this.creatingActivity.isCreating || type == 'end') {
          this.finishSelection();
        }
        break;
    }
  }

  finishSelection() {
    const { fromRefDate, toRefDate, profile, group } = this.creatingActivity;
    if (fromRefDate && toRefDate && profile && group) {
      this.calendarService.onRangeSelection({
        startDate: fromRefDate,
        endDate: toRefDate,
        profile,
        group,
      });
    }
    this.resetCreatingActivity();
  }

  resetCreatingActivity() {
    this.creatingActivity = {
      profile: null,
      isCreating: false,
      fromRefDate: null,
      toRefDate: null,
      group: null,
    };
  }

  isInTheCreation(group: IGroup, refDate: Date) {
    const { fromRefDate, toRefDate } = this.creatingActivity;
    const sameGroup = this.creatingActivity.group === group;
    let isIn = false;
    if (fromRefDate && toRefDate) {
      isIn = isBetween(refDate, fromRefDate, toRefDate);
    }

    return sameGroup && isIn;
  }

  @HostListener('mouseup') onClick() {
    this.finishSelection();
  }
















  async ngAfterViewInit(): Promise<void> {
    // const {
    //   RIGHT_PANEL: { NAVIGATOR, TITLE, HOST: RIGHT_PANEL_HOST },
    //   LEFT_PANEL: { HOST: LEFT_PANEL_HOST },
    // } = this.calendarService.selectors;

    // linkSize(RIGHT_PANEL_HOST, [TITLE, NAVIGATOR], { width: true });
    // linkScroll([LEFT_PANEL_HOST, RIGHT_PANEL_HOST], {
    //   scrollTop: true,
    // });
  }
}
