import { Component, HostListener, OnInit } from '@angular/core';
import {
  IActivity,
  IProcessedContent,
  IGroup,
} from '../../../../main/ngx-schedule-planner.interface';
import { ICreatingActivity } from './body.interface';
import { ActivityHTML } from '../../../../utils/classes/activity-html';
import { isBetween } from '../../../../utils/moment';
import moment from 'moment';
import { clone } from '../../../../utils/functions';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent extends ActivityHTML implements OnInit {
  creatingActivity!: ICreatingActivity;
  content!: IProcessedContent[];

  constructor() {
    super();
    this.calendarService.on.contentChange.subscribe((content) => {
      this.content = content.filtered;
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

  filterActivities(groupedActivities: IActivity[][]): IActivity[][] {
    const start = this.subColumns.startDate!;
    const end = this.subColumns.endDate!;
    const filtered: IActivity[][] = [];
    for (const group of groupedActivities) {
      const tempGroup: IActivity[] = [];
      for (const activity of group) {
        if (isBetween(activity.startDate, start, end)) {
          tempGroup.push(activity);
        }
      }
      if (tempGroup.length > 0) {
        filtered.push(tempGroup);
      }
    }
    return filtered;
  }

  getRepetitions(groupedActivities: IActivity[][]) {
    const start = this.subColumns.startDate!;
    const end = this.subColumns.endDate!;
    const filtered: IActivity[][] = [];
    for (const group of groupedActivities) {
      const tempGroup: IActivity[] = [];
      for (const activity of group) {
        for (const repeat of activity.repeat) {
          if (isBetween(repeat, start, end)) {
            const activityReplica = clone(activity);
            const startDate = moment(activity.startDate);

            activityReplica.startDate = moment(repeat)
              .hour(startDate.hour())
              .minute(startDate.minute())
              .second(startDate.second())
              .toDate();
            tempGroup.push(activityReplica);
          }
        }
      }
      if (tempGroup.length > 0) {
        filtered.push(tempGroup);
      }
    }
    return filtered;
  }
}
