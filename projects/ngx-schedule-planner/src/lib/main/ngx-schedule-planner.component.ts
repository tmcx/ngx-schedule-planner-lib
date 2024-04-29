import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CalendarService } from '../services/calendar/calendar.service';
import { IActivity, ITheme } from './internal.interfaces';
import { ICustomization, CalendarContent } from '../../public-interfaces';
import {
  floatingScroll,
  hasScroll,
  onResizeDo,
  querySelector,
  querySelectorAll,
  wait,
} from '../utils/functions';
import { CONFIG, SELECTOR, THEME } from '../config/constants';
import { EEvent } from '../services/calendar/calendar.interface';
import { CommonModule } from '@angular/common';
import { TopPanelComponent } from '../sections/top-panel/main/top-panel.component';
import { BottomPanelComponent } from '../sections/bottom-panel/main/bottom-panel.component';
import { ISelectedRange } from '../sections/bottom-panel/main/bottom-panel.interface';
import { TMode } from '../sections/top-panel/components/right-panel/right-panel.interface';
import { LoaderComponent } from '../shared/components/loader/loader.component';
import { StyleProcessor } from '../utils/style-processor';

@Component({
  standalone: true,
  selector: 'ngx-schedule-planner',
  templateUrl: './ngx-schedule-planner.component.html',
  styleUrls: ['./ngx-schedule-planner.component.scss'],
  host: { '[id]': 'uuid', '[attr.collapsed]': 'isCollapsed' },
  imports: [
    BottomPanelComponent,
    TopPanelComponent,
    LoaderComponent,
    CommonModule,
  ],
})
export class NgxSchedulePlannerComponent implements AfterViewInit {
  private isInitializing: boolean;
  private inputContent: {
    customization?: ICustomization;
    content?: CalendarContent;
    referenceDate?: Date;
    theme?: ITheme;
    mode?: TMode;
  };
  isCollapsed: boolean;
  uuid: string;
  @Output() onSelectRange: EventEmitter<ISelectedRange>;
  @Output() onActivityClick: EventEmitter<IActivity>;
  @Output() onAddActivityClick: EventEmitter<void>;

  @Input() set content(content: CalendarContent) {
    this.inputContent['content'] = content;
    this.initialize();
  }

  @Input() set referenceDate(referenceDate: Date) {
    this.inputContent['referenceDate'] = referenceDate;
    this.initialize();
  }

  @Input() set mode(mode: TMode) {
    this.inputContent['mode'] = mode;
    this.initialize();
  }

  @Input() set theme(themeName: string) {
    if (!THEME[themeName]) {
      throw new Error(`Missing theme ${themeName}`);
    }
    this.inputContent['theme'] = THEME[themeName];
  }

  @Input() set customization(customization: ICustomization) {
    this.inputContent['customization'] = customization;
    this.initialize();
  }

  constructor(private calendarService: CalendarService) {
    StyleProcessor.initialize(this.calendarService.uuid).then(() => {
      this.theme = 'DARK';
    });
    this.inputContent = {};
    this.isCollapsed = this.calendarService.config.leftPanel.isCollapsed;
    this.isInitializing = false;
    this.toggleCollapse();
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
        this.toggleCollapse();
      }
    });
  }

  async ngAfterViewInit(): Promise<void> {
    onResizeDo(SELECTOR.HOST, () => {
      hasScroll(SELECTOR.BOTTOM_PANEL).then(async ({ horizontal }) => {
        const value = horizontal ? CONFIG.ASPECT.SCROLL_HEIGHT : '0px';
        StyleProcessor.setProp(CONFIG.STYLE_VAR.ASPECT.SCROLL_HEIGHT, value);
      });

      querySelector('.sub-column').then((main) => {
        querySelectorAll('.row.new-activity span').then((els) => {
          els.forEach((el) => {
            console.log(main.offsetWidth, main.clientWidth, main.scrollWidth);
            el.style.width = main.clientWidth / 2 + 'px';
          });
        });
      });
    });
    floatingScroll(SELECTOR.BOTTOM_PANEL, { vertical: true });
  }

  async toggleCollapse() {
    const { HEADER_WIDTH, HEADER_WIDTH_COLLAPSED } = CONFIG.ASPECT;
    const value = this.isCollapsed ? HEADER_WIDTH_COLLAPSED : HEADER_WIDTH;
    StyleProcessor.setProp(CONFIG.STYLE_VAR.ASPECT.HEADER_WIDTH, value);
  }

  async initialize() {
    if (!this.isInitializing) {
      wait(100).then(async () => {
        const { referenceDate, customization, content, mode, theme } =
          this.inputContent;

        if (referenceDate) {
          this.calendarService.config.referenceDate = referenceDate;
        }
        if (customization) {
          this.calendarService.setCustomization(customization);
        }
        if (content) {
          this.calendarService.originalContent = content;
        }
        if (mode) {
          this.calendarService.config.mode = mode;
        }
        if (theme) {
          StyleProcessor.setTheme(theme);
        }
        await this.calendarService.refreshCalendarContent();
        this.isInitializing = false;
      });
    }
    this.isInitializing = true;
  }
}
