import { Component } from '@angular/core';
import { CalendarService } from '../../../../services/calendar/calendar.service';
import { InputSearchComponent } from '../../../../shared/inputs/input-search/input-search.component';
import { CommonModule } from '@angular/common';
import {
  ICalendarFilters,
  SortDirection,
} from '../../../../services/calendar/calendar.interface';
import { AddActivityBtnComponent } from '../../../../shared/components/add-activity-btn/add-activity-btn.component';
import { InputSortComponent } from '../../../../shared/inputs/input-sort/input-sort.component';
import { FilterBtnComponent } from '../../../../shared/components/filter-btn/filter-btn.component';
import { IFilters } from '../../../../shared/components/filter-btn/filter-btn.interface';

@Component({
  standalone: true,
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss'],
  imports: [
    AddActivityBtnComponent,
    InputSearchComponent,
    InputSortComponent,
    FilterBtnComponent,
    CommonModule,
  ],
})
export class LeftPanelComponent {
  filters: ICalendarFilters;

  constructor(public calendarService: CalendarService) {
    this.filters = {
      colorTags: [],
      groupName: '',
      userName: '',
      tags: [],
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

  get isCollapsed() {
    return this.calendarService.config.leftPanel.isCollapsed;
  }

  set isCollapsed(isCollapsed: boolean) {
    this.calendarService.setLeftPanelCollapse(isCollapsed);
  }

  sort(direction: SortDirection) {
    this.calendarService.sort(direction);
  }

  filterByTags(filters: IFilters) {
    ({ tags: this.filters.tags, colorTags: this.filters.colorTags } = filters);
    this.calendarService.startFiltering(this.filters);
  }
}
