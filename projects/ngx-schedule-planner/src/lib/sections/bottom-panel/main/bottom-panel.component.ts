import { Component, HostListener } from '@angular/core';
import { CalendarService } from '../../../services/calendar/calendar.service';
import { MarkerComponent } from '../components/marker/marker.component';
import { ShortNamePipe } from '../../../shared/pipes/short-name';
import { CommonModule } from '@angular/common';
import { IActivity, IGroup, IProfile } from '../../../main/internal.interfaces';
import {
  EEvent,
  ICalendarContent,
} from '../../../services/calendar/calendar.interface';
import { delay } from 'rxjs';
import { ICreatingActivity } from './bottom-panel.interface';
import { isBetween } from '../../../utils/moment';

@Component({
  standalone: true,
  selector: 'app-bottom-panel',
  templateUrl: './bottom-panel.component.html',
  styleUrls: ['./bottom-panel.component.scss'],
  imports: [ShortNamePipe, MarkerComponent, CommonModule],
})
export class BottomPanelComponent {
  creatingActivity!: ICreatingActivity;
  calendarContent!: ICalendarContent[];

  constructor(private calendarService: CalendarService) {
    this.calendarService.on.event.subscribe(({ event }) => {
      if (EEvent.contentChange == event) {
        this.calendarContent = this.calendarService.content;
      }
    });
    this.resetCreatingActivity();
  }

  get isCollapsed() {
    return this.calendarService.config.leftPanel.isCollapsed;
  }

  get subColumns() {
    return this.calendarService.subColumns();
  }

  addActivity(
    type: 'start' | 'end' | 'enter' | 'leave',
    profile: IProfile,
    group: IGroup,
    refDate: Date
  ) {
    switch (type) {
      case 'start':
        this.creatingActivity = {
          fromRefDate: refDate,
          toRefDate: refDate,
          isCreating: true,
          profile,
          group,
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

  clickOnActivity(activity: IActivity) {
    this.calendarService.clickOnActivity(activity);
  }
}
