import { Component, HostListener, OnInit } from '@angular/core';
import {
  IActivity,
  IProcessedContent,
  IGroup,
} from '../../../../main/ngx-schedule-planner.interface';
import moment from 'moment';
import { ICreatingActivity } from './body.interface';
import { ActivityHTML } from '../../../../utils/classes/activity-html';

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


  filterActivities(groupedActivities: IActivity[][]): IActivity[][] {
    const filtered: IActivity[][] = [];
    for (const group of groupedActivities) {
      const tempGroup: IActivity[] = [];
      for (const activity of group) {
        const {
          firstSection: { start },
        } = this.subColumns.at(0)!;
        const {
          lastSection: { end },
        } = this.subColumns.at(-1)!;

        if (moment(activity.startDate).isBetween(start, end)) {
          tempGroup.push(activity);
        }
      }
      filtered.push(tempGroup);
    }
    return filtered;
  }

}
