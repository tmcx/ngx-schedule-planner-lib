import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-input-calendar',
  templateUrl: './input-calendar.component.html',
  styleUrls: ['./input-calendar.component.scss'],
})
export class InputCalendarComponent {
  @Output() onChange: EventEmitter<Date>;

  constructor() {
    this.onChange = new EventEmitter<Date>();
  }
  onSelectDate($event: any) {
    console.log($event);
  }
}
