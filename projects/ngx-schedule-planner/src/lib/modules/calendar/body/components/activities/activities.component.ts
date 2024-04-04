import { Component, Input, OnInit } from '@angular/core';
import {
  IContent,
  ICreatingActivity,
  IGroup,
} from '../../../../../main/ngx-schedule-planner.interface';
import { CalendarService } from '../../../../../services/calendar/calendar.service';
import { ISubColumn } from '../../../header/components/header-grid/header-grid.interface';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
})
export class ActivitiesComponent implements OnInit {
  @Input() userSchedule!: IContent;
  private creatingActivity!: ICreatingActivity;

  constructor(private calendarService: CalendarService) {
    this.resetCreatingActivity();
  }

  ngOnInit() {}

  get subColumns() {
    return this.calendarService.config.columns[0].subColumns;
  }

  addActivity(
    type: 'start' | 'end' | 'enter' | 'leave',
    group: IGroup,
    subColumn: ISubColumn,
    refDate: Date
  ) {
    switch (type) {
      case 'start':
        this.creatingActivity = {
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
          this.openCreationModal();
          this.resetCreatingActivity();
        }
        break;
    }
  }

  resetCreatingActivity() {
    this.creatingActivity = {
      isCreating: false,
      group: null,
      fromRefDate: null,
      toRefDate: null,
    };
  }

  isInTheCreation(group: IGroup, refDate: Date) {
    const { fromRefDate, toRefDate } = this.creatingActivity;
    const sameGroup = this.creatingActivity.group === group;

    const isAfterFirst = fromRefDate && fromRefDate <= refDate;
    const isBeforeLast = toRefDate && toRefDate >= refDate;

    return sameGroup && isAfterFirst && isBeforeLast;
  }

  openCreationModal() {
    console.log({
      start: this.creatingActivity.fromRefDate,
      end: this.creatingActivity.toRefDate,
    });
    
  }
}
