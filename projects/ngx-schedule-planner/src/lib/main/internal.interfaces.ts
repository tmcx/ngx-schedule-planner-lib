import { TMode } from '../sections/top-panel/components/right-panel/right-panel.interface';
import { EEvent } from '../services/calendar/calendar.interface';

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
  durationInMin: number;
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

export interface ICTag {
  valuePath: string;
  isArray?: boolean;
  type: 'icon-tag';
}

export interface ICText {
  valuePath: string;
  isArray?: boolean;
  type: 'text';
}

export interface ICIConText {
  valuePath: string;
  isArray?: boolean;
  type: 'icon-text';
}

export interface ICDate {
  valuePath: string;
  isArray?: boolean;
  format?: string;
  type: 'date';
}

export type IConstants = {
  CALENDAR: {
    [key in TMode]: {
      ACTIVITY: {
        FACTOR: {
          WIDTH: string;
        };
      };
    };
  };
  STYLE: {
    '--ngx-header-width-collapsed': string;
    '--ngx-sp-host-bg-color': string;
    '--ngx-loader-bg-color': string;
    '--ngx-sp-border-color': string;
    '--ngx-scroll-height': string;
    '--ngx-header-height': string;
    '--ngx-header-width': string;
  };
  eventGroups: {
    SUB_COLUMNS: EEvent[];
  };
};
