import { Component, HostListener } from '@angular/core';
import { CalendarService } from '../../../services/calendar/calendar.service';
import { MarkerComponent } from '../components/marker/marker.component';
import { ShortNamePipe } from '../../../shared/pipes/short-name';
import { CommonModule } from '@angular/common';
import { IActivity, IGroup, IProfile } from '../../../main/internal.interfaces';
import {
  EEvent,
  ICalendarContent,
  ICalendarFilters,
} from '../../../services/calendar/calendar.interface';
import { ICreatingActivity } from './bottom-panel.interface';
import { isBetween } from '../../../utils/moment';
import { CONFIG } from '../../../config/constants';
import { ISubColumn } from '../../top-panel/components/right-panel/right-panel.interface';
import { NoContentComponent } from '../components/no-content/no-content.component';

@Component({
  standalone: true,
  selector: 'app-bottom-panel',
  templateUrl: './bottom-panel.component.html',
  styleUrls: ['./bottom-panel.component.scss'],
  imports: [ShortNamePipe, MarkerComponent, NoContentComponent, CommonModule],
})
export class BottomPanelComponent {
  creatingActivity!: ICreatingActivity;
  calendarContent!: ICalendarContent[];
  filters: ICalendarFilters;
  subColumns: ISubColumn[];
  isCollapsed: boolean;

  constructor(private calendarService: CalendarService) {
    this.isCollapsed = this.calendarService.config.leftPanel.isCollapsed;
    this.filters = this.calendarService.config.filters;
    this.subColumns = [];
    this.calendarService.on.event.subscribe(async ({ event, data }) => {
      if (EEvent.contentChange == event) {
        this.calendarContent = this.calendarService.content;
      }
      if (CONFIG.eventGroups.SUB_COLUMNS.includes(event)) {
        const { subColumns } = await this.calendarService.subColumns();
        this.subColumns = subColumns;
      }
      if (event == EEvent.leftPanelCollapse) {
        this.isCollapsed = data;
      }
      if (event == EEvent.filtering) {
        this.filters = this.calendarService.config.filters;
      }
    });
    this.resetCreatingActivity();
  }

  addActivity(
    type: 'start' | 'end' | 'enter' | 'leave',
    profile: IProfile,
    group: IGroup,
    refDate: Date
  ) {
    switch (type) {
      case 'start':
        this.creatingActivity = {
          fromRefDate: refDate,
          toRefDate: refDate,
          isCreating: true,
          profile,
          group,
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
          this.finishSelection();
        }
        break;
    }
  }

  finishSelection() {
    const { fromRefDate, toRefDate, profile, group } = this.creatingActivity;
    if (fromRefDate && toRefDate && profile && group) {
      this.calendarService.onRangeSelection({
        startDate: fromRefDate,
        endDate: toRefDate,
        profile,
        group,
      });
    }
    this.resetCreatingActivity();
  }

  resetCreatingActivity() {
    this.creatingActivity = {
      profile: null,
      isCreating: false,
      fromRefDate: null,
      toRefDate: null,
      group: null,
    };
  }

  isInTheCreation(group: IGroup, refDate: Date) {
    const { fromRefDate, toRefDate } = this.creatingActivity;
    const sameGroup = this.creatingActivity.group === group;
    let isIn = false;
    if (fromRefDate && toRefDate) {
      isIn = isBetween(refDate, fromRefDate, toRefDate);
    }

    return sameGroup && isIn;
  }

  @HostListener('mouseup') onClick() {
    if (this.creatingActivity.isCreating) {
      this.finishSelection();
    }
  }

  clickOnActivity(activity: IActivity) {
    this.calendarService.clickOnActivity(activity);
  }
}
