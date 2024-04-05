import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CalendarService } from '../services/calendar/calendar.service';
import { IContent, ISelectedRange } from './ngx-schedule-planner.interface';
import {
  EMode,
  TMode,
} from '../modules/calendar/header/components/header-grid/header-grid.interface';

@Component({
  selector: 'ngx-schedule-planner',
  templateUrl: './ngx-schedule-planner.component.html',
  styleUrls: ['./ngx-schedule-planner.component.scss'],
})
export class NgxSchedulePlannerComponent {
  @Output() onSelectRange: EventEmitter<ISelectedRange>;
  @Output() onAddActivityClick: EventEmitter<void>;

  @Input() set content(content: IContent[]) {
    this.calendarService.changeContent(content, 'all');
    this.calendarService.changeContent(content, 'filtered');
  }

  @Input() set referencedDate(referencedDate: Date) {
    this.calendarService.changeReferenceDate(referencedDate);
  }

  @Input() set mode(mode: TMode) {
    this.calendarService.changeMode(mode);
  }

  constructor(private calendarService: CalendarService) {
    this.calendarService.changeMode(EMode.monthly);
    this.calendarService.changeReferenceDate(new Date());
    this.onSelectRange = new EventEmitter<ISelectedRange>();
    this.onAddActivityClick = new EventEmitter<void>();
    this.calendarService.onSelectRange.subscribe((rangeActivity) => {
      this.onSelectRange.emit(rangeActivity);
    });
    this.calendarService.onAddActivityClick.subscribe(() => {
      this.onAddActivityClick.emit();
    });
  }
}
