import { Component, EventEmitter, Output } from '@angular/core';
import { SortDirection } from '../../../services/calendar/calendar.interface';
import { CalendarService } from '../../../services/calendar/calendar.service';

@Component({
  standalone: true,
  selector: 'app-input-sort',
  templateUrl: './input-sort.component.html',
  styleUrls: ['./input-sort.component.scss'],
})
export class InputSortComponent {
  @Output() onClick = new EventEmitter<SortDirection>();
  direction: SortDirection;
  content!: string;
  title!: string;

  constructor(private calendarService: CalendarService) {
    this.direction = this.calendarService.config.sortBy.direction;
    this.setOrder();
  }

  click() {
    this.direction =
      this.direction == SortDirection.desc
        ? SortDirection.asc
        : SortDirection.desc;
    this.setOrder();
    this.onClick.emit(this.direction);
  }

  private setOrder() {
    switch (this.direction) {
      case SortDirection.desc:
        this.title = 'Name';
        this.content = '▾';
        break;
      case SortDirection.asc:
        this.title = 'Name';
        this.content = '▴';
        break;
      default:
        this.title = '';
        this.content = '';
        break;
    }
  }
}
