import { Component } from '@angular/core';
import { CalendarService } from '../../../../services/calendar/calendar.service';
import { EEvent } from '../../../../services/calendar/calendar.interface';
import { AddActivityBtnComponent } from '../../../../shared/components/add-activity-btn/add-activity-btn.component';

@Component({
  standalone: true,
  selector: 'app-no-content',
  templateUrl: './no-content.component.html',
  styleUrls: ['./no-content.component.scss'],
  host: { '[attr.class]': 'classes' },
  imports:[AddActivityBtnComponent]
})
export class NoContentComponent {
  classes = '';

  constructor(private calendarService: CalendarService) {
    this.calendarService.on.event.subscribe(({ event }) => {
      if (EEvent.contentChange == event) {
        this.classes = this.calendarService.content.length > 0 ? 'hidden' : '';
      }
    });
  }
}
