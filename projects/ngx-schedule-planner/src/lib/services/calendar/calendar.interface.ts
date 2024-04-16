import {
  TNavigationChange,
  EPeriod,
  TMode,
  IColumn,
} from '../../modules/right-panel/components/header/header.interface';
import { ISelectedRange } from '../../modules/right-panel/components/body/body.interface';
import { Subject } from 'rxjs';
import {
  IProcessedContent,
  IProcessedCustomization,
} from '../../main/ngx-schedule-planner.interface';

export interface ICalendarServiceEvents {
  navigationChange: Subject<TNavigationChange>;
  selectRange: Subject<ISelectedRange>;
  leftPanelCollapse: Subject<boolean>;
  addActivityClick: Subject<void>;
  periodChange: Subject<EPeriod>;
  modeChange: Subject<TMode>;
  contentChange: Subject<{
    filtered: IProcessedContent[];
    all: IProcessedContent[];
  }>;
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
  filtered: IProcessedContent[];
  all: IProcessedContent[];
}

export interface ICalendarSelectors {
  HOST: string;
  LEFT_PANEL: {
    HOST: string;
    APP_BODY: string;
    GROUPS: string;
  };
  RIGHT_PANEL: {
    HOST: string;
    GROUPS: string;
    NAVIGATOR: string;
    TITLE: string;
    APP_MARKER: string;
    APP_BODY: string;
  };
}
