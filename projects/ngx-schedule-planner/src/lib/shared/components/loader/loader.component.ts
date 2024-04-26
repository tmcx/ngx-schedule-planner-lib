import { Component } from '@angular/core';
import { EEvent } from '../../../services/calendar/calendar.interface';
import { CalendarService } from '../../../services/calendar/calendar.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  imports: [CommonModule],
  host: { '[attr.class]': 'isLoading' },
})
export class LoaderComponent {
  isLoading: boolean;

  constructor(private calendarService: CalendarService) {
    this.isLoading = this.calendarService.config.isLoading;
    this.calendarService.on.event.subscribe(({ event, data }) => {
      if (event == EEvent.loading) {
        this.isLoading = data;
      }
    });
  }
}
