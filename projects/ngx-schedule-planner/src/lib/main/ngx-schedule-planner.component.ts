import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CalendarService } from '../services/calendar/calendar.service';
import { IConstants, IProcessedContent } from './internal.interfaces';
import { IContent, ICustomization } from '../../public-interfaces';
import moment from 'moment';
import {
  clone,
  floatingScroll,
  groupActivities,
  hasScroll,
  linkSize,
  onResizeDo,
  querySelector,
} from '../utils/functions';
import { CONFIG } from '../config/constants';
import { EEvent } from '../services/calendar/calendar.interface';
import { CommonModule } from '@angular/common';
import { TopPanelComponent } from '../sections/top-panel/main/top-panel.component';
import { BottomPanelComponent } from '../sections/bottom-panel/main/bottom-panel.component';
import { ISelectedRange } from '../sections/bottom-panel/main/bottom-panel.interface';
import { TMode } from '../sections/top-panel/components/right-panel/right-panel.interface';

@Component({
  standalone: true,
  selector: 'ngx-schedule-planner',
  templateUrl: './ngx-schedule-planner.component.html',
  styleUrls: ['./ngx-schedule-planner.component.scss'],
  host: { '[id]': 'uuid', '[attr.collapsed]': 'isCollapsed' },
  imports: [TopPanelComponent, BottomPanelComponent, CommonModule],
})
export class NgxSchedulePlannerComponent implements AfterViewInit {
  isCollapsed: boolean;
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

  @Input() set customization(customization: ICustomization) {
    this.calendarService.setCustomization(customization);
  }

  constructor(private calendarService: CalendarService) {
    this.isCollapsed = this.calendarService.config.isLoading;
    this.toggleCollapse(this.isCollapsed);
    this.uuid = this.calendarService.uuid;
    this.onSelectRange = new EventEmitter<ISelectedRange>();
    this.onAddActivityClick = new EventEmitter<void>();
    this.calendarService.on.event.subscribe(({ event, data }) => {
      if (event == EEvent.addActivityClick) {
        this.onAddActivityClick.emit();
      }
      if (event == EEvent.selectedRange) {
        this.onSelectRange.emit(data);
      }
      if (event == EEvent.leftPanelCollapse) {
        this.isCollapsed = data;
        this.toggleCollapse(this.isCollapsed);
      }
    });
  }

  async ngAfterViewInit(): Promise<void> {
    this.setCssVariables();
    onResizeDo(this.calendarService.selectors.HOST, () => {
      hasScroll(this.calendarService.selectors.RIGHT_PANEL.HOST).then(
        async ({ horizontal }) => {
          var root = await querySelector(this.calendarService.selectors.HOST);
          const key = '--ngx-scroll-height';
          const value = horizontal ? CONFIG.STYLE[key] : '0px';
          root.style.setProperty(key, value);
        }
      );
    });
    floatingScroll('app-bottom-panel', { vertical: true });
    linkSize(
      'ngx-schedule-planner app-top-panel app-right-panel',
      ['ngx-schedule-planner app-bottom-panel .group .row'],
      { width: true }
    );
  }

  processInputContent(content: IContent[]): IProcessedContent[] {
    const parsedContent = clone<any>(content);
    parsedContent.forEach((userContent: any) => {
      userContent.groups.forEach((group: any) => {
        group.activities.forEach((activity: any) => {
          activity['durationInMin'] = moment(activity.endDate).diff(
            activity.startDate,
            'm'
          );
        });
        const activities = groupActivities(group.activities);
        group['groupedActivities'] = activities;
      });
    });
    return parsedContent;
  }

  get isLoading() {
    return this.calendarService.config.isLoading;
  }

  async setCssVariables() {
    var root = await querySelector(this.calendarService.selectors.HOST);
    for (const varName in CONFIG.STYLE) {
      if (Object.prototype.hasOwnProperty.call(CONFIG.STYLE, varName)) {
        const value = CONFIG.STYLE[varName as keyof IConstants['STYLE']];
        root.style.setProperty(varName, value);
      }
    }
  }

  async toggleCollapse(collapsed: boolean) {
    var root = await querySelector(this.calendarService.selectors.HOST);

    if (collapsed) {
      root.style.setProperty(
        '--ngx-header-width',
        CONFIG.STYLE['--ngx-header-width-collapsed']
      );
    } else {
      root.style.setProperty(
        '--ngx-header-width',
        CONFIG.STYLE['--ngx-header-width']
      );
    }
  }
}
