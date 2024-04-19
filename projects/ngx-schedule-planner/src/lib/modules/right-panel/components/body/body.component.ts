import { Component, HostListener, OnInit } from '@angular/core';
import {
  IProcessedContent,
  IGroup,
} from '../../../../main/ngx-schedule-planner.interface';
import { ICreatingActivity } from './body.interface';
import { ActivityHTML } from '../../../../utils/classes/activity-html';
import { isBetween } from '../../../../utils/moment';
import { ICalendarContent } from '../../../../services/calendar/calendar.interface';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent extends ActivityHTML implements OnInit {
  creatingActivity!: ICreatingActivity;
  content!: ICalendarContent;

  constructor() {
    super();
    this.calendarService.on.contentChange.subscribe((content) => {
      this.content = content;
    });
    this.resetCreatingActivity();
  }

  ngOnInit() {}

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
