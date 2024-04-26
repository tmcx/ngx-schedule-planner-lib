import { Component } from '@angular/core';
import { CalendarService } from '../../../services/calendar/calendar.service';

@Component({
  standalone: true,
  selector: 'app-add-activity-btn',
  templateUrl: './add-activity-btn.component.html',
  styleUrls: ['./add-activity-btn.component.scss'],
})
export class AddActivityBtnComponent {
  constructor(private calendarService: CalendarService) {}

  addActivity() {
    this.calendarService.addActivityClicked();
  }
}
