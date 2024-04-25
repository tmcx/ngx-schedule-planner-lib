import { Component } from '@angular/core';
import { CalendarService } from '../../../../services/calendar/calendar.service';
import { InputSearchComponent } from '../../../../shared/inputs/input-search/input-search.component';
import { CommonModule } from '@angular/common';
import {
  ICalendarFilters,
} from '../../../../services/calendar/calendar.interface';

@Component({
  standalone: true,
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss'],
  imports: [InputSearchComponent, CommonModule],
})
export class LeftPanelComponent {
  filters: ICalendarFilters;

  constructor(public calendarService: CalendarService) {
    this.filters = {
      groupName: '',
      userName: '',
    };
  }

  filterByUserName(name: string) {
    this.filters.userName = name;
    this.filter();
  }

  filterByGroupName(name: string) {
    this.filters.groupName = name;
    this.filter();
  }

  private filter() {
    this.calendarService.startFiltering(this.filters);
  }

  addActivity() {
    this.calendarService.addActivityClicked();
  }

  get isCollapsed() {
    return this.calendarService.config.leftPanel.isCollapsed;
  }

  set isCollapsed(isCollapsed: boolean) {
    this.calendarService.setLeftPanelCollapse(isCollapsed);
  }
}
