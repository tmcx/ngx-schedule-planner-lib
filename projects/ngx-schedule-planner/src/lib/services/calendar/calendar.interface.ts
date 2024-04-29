import { Subject } from 'rxjs';
import {
  IActivity,
  IGroup,
  IProcessedCustomization,
  IProfile,
} from '../../main/internal.interfaces';
import { ISelectedRange } from '../../sections/bottom-panel/main/bottom-panel.interface';
import {
  TNavigationChange,
  EPeriod,
  TMode,
  IColumn,
  ISubColumn,
} from '../../sections/top-panel/components/right-panel/right-panel.interface';

export enum EEvent {
  afterRefreshCalendarContent = 'afterRefreshCalendarContent',
  leftPanelCollapse = 'leftPanelCollapse',
  addActivityClick = 'addActivityClick',
  clickOnActivity = 'clickOnActivity',
  selectedRange = 'selectedRange',
  referenceDate = 'referenceDate',
  contentChange = 'contentChange',
  navigation = 'navigation',
  filtering = 'filtering',
  loading = 'loading',
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
  | { event: EEvent.clickOnActivity; data: IActivity }
  | { event: EEvent.filtering; data?: undefined }
  | { event: EEvent.referenceDate; data: Date }
  | { event: EEvent.loading; data: boolean }
  | { event: EEvent.period; data: EPeriod };

export interface ICalendarServiceEvents {
  event: Subject<EEvents>;
}

export interface ICalendarFilters {
  groupName: string;
  userName: string;
}

export interface ICalendarConfig {
  summary: {
    totalUsers: number;
    showingUsers: number;
  };
  filters: ICalendarFilters;
  activity: { factor: { width: string } };
  customization: IProcessedCustomization;
  referenceDate: Date;
  isLoading: boolean;
  interval: {
    startDate: Date;
    endDate: Date;
  };
  leftPanel: {
    isCollapsed: boolean;
  };
  columns: IColumn[];
  title: string;
  mode: TMode;
}

export interface ICalendarContent {
  profile: IProfileWithFilters;
  current: {
    group: IGroupWithFilters;
    activities: IActivity[][];
  }[];
}

interface IProfileWithFilters extends IProfile {
  hidden?: { byUserName: boolean; byGroupName: boolean };
}

interface IGroupWithFilters extends IGroup {
  hidden?: { byGroupName: boolean };
}
