import { Component, HostListener, OnInit } from '@angular/core';
import {
  IActivity,
  IProcessedContent,
  IGroup,
} from '../../../../main/ngx-schedule-planner.interface';
import { CalendarService } from '../../../../services/calendar/calendar.service';
import moment from 'moment';
import { ICreatingActivity } from './body.interface';
import { EMode, ISubColumn } from '../header/header.interface';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent implements OnInit {
  creatingActivity!: ICreatingActivity;
  content!: IProcessedContent[];

  constructor(private calendarService: CalendarService) {
    this.calendarService.onContentChange.subscribe((content) => {
      this.content = content.filtered;
    });
    this.resetCreatingActivity();
  }

  ngOnInit() {}

  get subColumns() {
    return this.calendarService.config.columns.length
      ? this.calendarService.config.columns[0].subColumns
      : [];
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

    const isAfterFirst = fromRefDate && fromRefDate <= refDate;
    const isBeforeLast = toRefDate && toRefDate >= refDate;

    return sameGroup && isAfterFirst && isBeforeLast;
  }

  @HostListener('mouseup') onClick() {
    this.finishSelection();
  }

  isActivityStart(
    type: 'start' | 'end',
    section: ISubColumn,
    activity: IActivity
  ) {
    const { start, end } =
      type == 'start' ? section.firstSection : section.lastSection;
    return start <= activity.startDate && activity.startDate <= end;
  }

  activityStyles(activity: IActivity) {
    const minutes = activity.durationInMin;
    const {
      activity: {
        factor: { width: widthFactor },
      },
    } = this.calendarService.config;
    let left = '';
    let width = '';
    switch (this.calendarService.config.mode) {
      case EMode.monthly:
        width = `calc((100% / ${moment(activity.startDate).daysInMonth()}) * ${
          minutes / widthFactor
        })`;
        left = `calc((100% / 48) * ${moment(activity.startDate).hour()})`;
        break;
      case EMode.weekly:
        width = `calc((100% / 24) * ${minutes / widthFactor})`;
        left = `calc((100% / 48) * ${moment(activity.startDate).hour()})`;
        break;
      case EMode.daily:
        width = `calc(100% * ${minutes / widthFactor})`;
        break;
    }
    return { width, left };
  }
}
