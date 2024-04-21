import {
  TNavigationChange,
  EPeriod,
  TMode,
  IColumn,
} from '../../modules/right-panel/components/header/header.interface';
import { ISelectedRange } from '../../modules/right-panel/components/body/body.interface';
import { Subject } from 'rxjs';
import {
  IActivity,
  IProcessedContent,
  IProcessedCustomization,
} from '../../main/internal.interfaces';

export enum EEvent {
  afterRefreshCalendarContent = 'afterRefreshCalendarContent',
  leftPanelCollapse = 'leftPanelCollapse',
  addActivityClick = 'addActivityClick',
  selectedRange = 'selectedRange',
  referenceDate = 'referenceDate',
  contentChange = 'contentChange',
  navigation = 'navigation',
  period = 'period',
  mode = 'mode',
}

type EEvents =
  | { event: EEvent.afterRefreshCalendarContent; data?: undefined }
  | { event: EEvent.mode; data: { mode: TMode; force: boolean } }
  | { event: EEvent.contentChange; data: 'filtered' | 'all' }
  | { event: EEvent.selectedRange; data: ISelectedRange }
  | { event: EEvent.navigation; data: TNavigationChange }
  | { event: EEvent.addActivityClick; data?: undefined }
  | { event: EEvent.leftPanelCollapse; data: boolean }
  | { event: EEvent.referenceDate; data: Date }
  | { event: EEvent.period; data: EPeriod };

export interface ICalendarServiceEvents {
  event: Subject<EEvents>;
}

export interface ICalendarConfig {
  activity: { factor: { width: string } };
  customization: IProcessedCustomization;
  referenceDate: Date;
  isLoading: boolean;
  leftPanel: {
    isCollapsed: boolean;
  };
  columns: IColumn[];
  mode: TMode;
}

export interface ICalendarContent {
  title: string;
  current: {
    repetitions: IActivity[][][][];
    activities: IActivity[][][][];
  };
  filtered: IProcessedContent[];
  all: IProcessedContent[];
}

export interface ICalendarSelectors {
  HOST: string;
  LEFT_PANEL: {
    HOST: string;
    APP_BODY: string;
    GROUPS: string;
    PROFILE_GROUPS: string;
  };
  RIGHT_PANEL: {
    HOST: string;
    USER_GROUPS: string;
    GROUPS: string;
    NAVIGATOR: string;
    TITLE: string;
    APP_MARKER: string;
    APP_BODY: string;
  };
}
