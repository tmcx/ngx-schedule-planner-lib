import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { ICreatingActivity } from '../../main/bottom-panel.interface';
import { EEvent, ICalendarContent } from '../../../../services/calendar/calendar.interface';
import { CalendarService } from '../../../../services/calendar/calendar.service';
import { isBetween } from '../../../../utils/moment';
import { IGroup, IProcessedContent } from '../../../../main/internal.interfaces';

@Component({
  standalone: true,
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.scss'],
  imports: [CommonModule],
})
export class RightPanelComponent {
  creatingActivity!: ICreatingActivity;
  content!: ICalendarContent;

  constructor(private calendarService: CalendarService) {
    this.calendarService.on.event.subscribe(({ event }) => {
      if (EEvent.contentChange == event) {
        this.content = this.calendarService.content;
        this.calendarService.on.event.next({
          event: EEvent.afterRefreshCalendarContent,
        });
      }
    });
    this.resetCreatingActivity();
  }

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

}
