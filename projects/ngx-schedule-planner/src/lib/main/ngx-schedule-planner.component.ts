import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CalendarService } from '../services/calendar/calendar.service';
import { IActivity, IConstants } from './internal.interfaces';
import { IContent, ICustomization } from '../../public-interfaces';
import {
  floatingScroll,
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
  isLoading: boolean;
  uuid: string;
  @Output() onSelectRange: EventEmitter<ISelectedRange>;
  @Output() onActivityClick: EventEmitter<IActivity>;
  @Output() onAddActivityClick: EventEmitter<void>;

  @Input() set content(content: IContent[]) {
    this.calendarService.changeCurrentContent(content);
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
    this.isCollapsed = this.calendarService.config.leftPanel.isCollapsed;
    this.isLoading = this.calendarService.config.isLoading;
    this.toggleCollapse(this.isCollapsed);
    this.uuid = this.calendarService.uuid;
    this.onAddActivityClick = new EventEmitter();
    this.onActivityClick = new EventEmitter();
    this.onSelectRange = new EventEmitter();
    this.calendarService.on.event.subscribe(({ event, data }) => {
      if (event == EEvent.clickOnActivity) {
        this.onActivityClick.emit(data);
      }
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
      if (event == EEvent.loading) {
        this.isLoading = data;
      }
    });
  }

  async ngAfterViewInit(): Promise<void> {
    this.setCssVariables();
    onResizeDo(this.calendarService.selectors.HOST, () => {
      hasScroll(this.calendarService.selectors.BOTTOM_PANEL).then(
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
