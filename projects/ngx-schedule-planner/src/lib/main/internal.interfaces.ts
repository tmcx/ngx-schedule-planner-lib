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

export interface IConstants {
  CALENDAR: {
    [key in TMode]: {
      ACTIVITY: {
        FACTOR: {
          WIDTH: string;
        };
      };
    };
  };
  STYLE_VAR: {
    ASPECT: IConstants['ASPECT'];
    THEME: ITheme;
  };
  ASPECT: {
    HEADER_WIDTH_COLLAPSED: string;
    BORDER_RADIUS: string;
    SCROLL_HEIGHT: string;
    HEADER_HEIGHT: string;
    HEADER_WIDTH: string;
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

export interface IThemes {
  LIGHT: ITheme;
  DARK: ITheme;
  [key: string]: ITheme;
}

interface IObject {
  [key: string]: string | object;
}

export interface ITheme extends IObject {
  PROFILE: {
    BOX_SHADOW: string;
    HORIZONTAL_SPACING: string;
    VERTICAL_SPACING: string;
  };
  ACTIVITY: {
    BACKGROUND_COLOR: string;
    FONT_COLOR: string;
    NEW_ACTIVITY_LINE: {
      BACKGROUND_COLOR: string;
    };
  };
  HEADER: {
    BACKGROUND_COLOR: string;
  };
  BODY: {
    BACKGROUND_COLOR: string;
  };
  GLOBAL: {
    BACKGROUND_COLOR: string;
    LOADER_BG_COLOR: string;
    SCROLLBAR_COLOR: string;
    BORDER_COLOR: string;
    FONT_COLOR: string;
  };
}
