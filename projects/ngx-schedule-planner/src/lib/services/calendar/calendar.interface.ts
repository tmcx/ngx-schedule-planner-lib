import { Subject } from 'rxjs';
import {
  IActivity,
  IColorTag,
  IGroup,
  IProcessedCustomization,
  IProfile,
  ITag,
} from '../../main/internal.interfaces';
import { ISelectedRange } from '../../sections/bottom-panel/main/bottom-panel.interface';
import {
  TNavigationChange,
  EPeriod,
  TMode,
  IColumn,
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
  colorTags: IColorTag[];
  tags: ITag[];
}

export enum SortDirection {
  asc = 'asc',
  desc = 'desc',
}

export interface ITimeRange {
  hrFrom: number;
  hrTo: number;
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
    timeRange: ITimeRange;
    hoursAmount: number;
    global: {
      startDate: Date;
      endDate: Date;
    };
  };
  leftPanel: {
    isCollapsed: boolean;
  };
  sortBy: { field: 'name'; direction: SortDirection };
  columns: IColumn[];
  title: string;
  mode: TMode;
}

export interface ICalendarContent {
  profile: IProfileWithFilters;
  current: {
    group: IGroupWithFilters;
    rows: {
      hidden?: boolean;
      activities: IActivityWithFilters[];
    }[];
  }[];
}

interface IProfileWithFilters extends IProfile {
  hidden?: boolean;
}

interface IGroupWithFilters extends IGroup {
  hidden?: boolean;
}
interface IActivityWithFilters extends IActivity {
  hidden?: boolean;
}
