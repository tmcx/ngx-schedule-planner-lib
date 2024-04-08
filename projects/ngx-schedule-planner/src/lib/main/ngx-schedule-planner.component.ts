import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CalendarService } from '../services/calendar/calendar.service';
import { IProcessedContent } from './ngx-schedule-planner.interface';
import {
  EMode,
  TMode,
} from '../modules/right-panel/components/header/header.interface';
import { ISelectedRange } from '../modules/right-panel/components/body/body.interface';
import { IContent } from '../ngx-schedule-planner.interface';
import moment from 'moment';

@Component({
  selector: 'ngx-schedule-planner',
  templateUrl: './ngx-schedule-planner.component.html',
  styleUrls: ['./ngx-schedule-planner.component.scss'],
  host: { '[id]': 'uuid' },
})
export class NgxSchedulePlannerComponent {
  uuid: string;
  @Output() onSelectRange: EventEmitter<ISelectedRange>;
  @Output() onAddActivityClick: EventEmitter<void>;

  @Input() set content(content: IContent[]) {
    const processedContent = this.processInputContent(content);

    this.calendarService.changeContent(processedContent, 'all');
    this.calendarService.changeContent(processedContent, 'filtered');
  }

  @Input() set referencedDate(referencedDate: Date) {
    this.calendarService.changeReferenceDate(referencedDate);
  }

  @Input() set mode(mode: TMode) {
    this.calendarService.changeMode(mode, true);
  }

  constructor(private calendarService: CalendarService) {
    this.uuid = this.calendarService.uuid;
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

  processInputContent(content: IContent[]): IProcessedContent[] {
    (content as IProcessedContent[]).forEach(
      (userContent: IProcessedContent) => {
        userContent.groups.forEach((group) => {
          group.activities.forEach((activity) => {
            activity['durationInMin'] = moment(activity.endDate).diff(
              activity.startDate,
              'm'
            );
          });
        });
      }
    );
    return content as IProcessedContent[];
  }
}
