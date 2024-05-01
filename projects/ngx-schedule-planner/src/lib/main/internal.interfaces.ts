import { TMode } from '../sections/top-panel/components/right-panel/right-panel.interface';
import { EEvent } from '../services/calendar/calendar.interface';
import moment from 'moment';

export interface IProfile {
  profileId: number;
  name: string;
  description: string;
  tags: {
    tagId: number;
    name: string;
  }[];
  imageUrl: string;
}

export interface IGroup {
  name: string;
  groupId: number;
  icon: string;
  style?: { height: number };
}

export interface IActivity {
  activityId: number;
  groupId: number;
  name: string;
  startDate: Date;
  endDate: Date;
  repeat: string[];
  tags: ITag[];
  style?: { width: string; left: string };
  htmlContent?: string;
  [key: string]: IIconText | string | number | any;
}

export interface IIconText {
  icon: string;
  text: string;
}

export interface ITag {
  tagId: number;
  icon: string;
  name: string;
}

export interface IProcessedCustomization {
  CALENDAR?: {
    ACTIVITY?: {
      INLINE_SHOW?: (ICTag | ICText | ICIConText | ICDate)[];
    };
  };
}

interface ICTag {
  valuePath: string;
  isArray?: boolean;
  type: 'icon-tag';
}

interface ICText {
  valuePath: string;
  isArray?: boolean;
  type: 'text';
}

interface ICIConText {
  valuePath: string;
  isArray?: boolean;
  type: 'icon-text';
}

interface ICDate {
  valuePath: string;
  isArray?: boolean;
  format?: string;
  type: 'date';
}

export type STYLE_VAR_KEYS = keyof IConstants['STYLE_VAR'];

export interface IConstants {
  CALENDAR: {
    [key in TMode]: {
      ACTIVITY: {
        FACTOR: {
          WIDTH: string;
        };
      };
      ENTITY: [any, moment.unitOfTime.StartOf];
    };
  };
  STYLE_VAR: {
    HEADER_WIDTH_COLLAPSED: string;
    SP_HOST_BG_COLOR: string;
    SP_BORDER_COLOR: string;
    LOADER_BG_COLOR: string;
    HEADER_HEIGHT: string;
    HEADER_WIDTH: string;
    SCROLL_HEIGHT: string;
  };
  STYLE: {
    [key in STYLE_VAR_KEYS]: string;
  };
  eventGroups: {
    SUB_COLUMNS: EEvent[];
  };
}

export interface ISelectors {
  HOST: string;
  APP_MARKER: string;
  BOTTOM_PANEL: string;
  APP_RIGHT_PANEL: string;
  BOTTOM_PANEL_ROW: string;
}
