import { Component, Input, OnInit } from '@angular/core';
import { CalendarService } from '../services/calendar/calendar.service';
import { moment } from '../utils/moment';
import { MOCK } from './mock';
import {
  IContent,
  ICreatingActivity,
  IGroup,
} from './ngx-schedule-planner.interface';
import {
  EMode,
  ISubColumn,
} from '../modules/calendar/header-grid/header-grid.interface';

@Component({
  selector: 'ngx-schedule-planner',
  templateUrl: './ngx-schedule-planner.component.html',
  styleUrls: ['./ngx-schedule-planner.component.scss'],
})
export class NgxSchedulePlannerComponent implements OnInit {
  @Input() content: IContent[] = MOCK;
  private creatingActivity!: ICreatingActivity;

  constructor(private calendarService: CalendarService) {
    this.resetCreatingActivity();
  }

  ngOnInit(): void {
    this.calendarService.changeMode(EMode.weekly);
    const referenceDate = moment(new Date()).clone().add(17, 'd').toDate();
    this.calendarService.changeReferenceDate(referenceDate);
  }

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
        console.log({ type, refDate, subColumn: subColumn.firstDate });
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
          console.log({
            type,
            half: this.creatingActivity.toRefDate,
          });
          // Abrir modal de creacion
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
}
