import { Component, HostListener, OnInit } from '@angular/core';
import {
  IContent,
  ICreatingActivity,
  IGroup,
} from '../../../../main/ngx-schedule-planner.interface';
import { CalendarService } from '../../../../services/calendar/calendar.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent implements OnInit {
  creatingActivity!: ICreatingActivity;
  content!: IContent[];

  constructor(private calendarService: CalendarService) {
    this.calendarService.onContentChange.subscribe((content) => {
      this.content = content.filtered;
    });
    this.resetCreatingActivity();
  }

  ngOnInit() {}

  get subColumns() {
    return this.calendarService.config.columns[0].subColumns;
  }

  addActivity(
    type: 'start' | 'end' | 'enter' | 'leave',
    userSchedule: IContent,
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

    const isAfterFirst = fromRefDate && fromRefDate <= refDate;
    const isBeforeLast = toRefDate && toRefDate >= refDate;

    return sameGroup && isAfterFirst && isBeforeLast;
  }

  @HostListener('mouseup') onClick() {
    this.finishSelection();
  }
}
