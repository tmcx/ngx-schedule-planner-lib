export interface ICustomization {
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
  format: string;
  type: 'date';
}

interface IActivity {
  groupId: number;
  activityId: number;
  name: string;
  startDate: string;
  endDate: string;
  repeat: string[];
  tags: number[];
  colorTags: number[];
}

interface IProfile {
  profileId: number;
  name: string;
  description: string;
  tags: number[];
  activities: { activityId: number }[];
  imageUrl: string;
}

interface IGroup {
  name: string;
  groupId: number;
  icon: string;
}

interface IColorTag {
  colorTagId: number;
  color: string;
  name: string;
}

interface ITag {
  tagId: number;
  icon?: string;
  name: string;
}

interface IRole {
  roleId: number;
  label: string;
}

export interface CalendarContent {
  activities: { [activityId: number]: IActivity };
  colorTags: { [colorTagId: number]: IColorTag };
  groups: { [activityId: number]: IGroup };
  roles: { [roleId: number]: IRole };
  tags: { [tagId: number]: ITag };
  profiles: IProfile[];
}
export interface ITheme {
  GLOBAL?: {
    BACKGROUND?: string;
    BORDER_RADIUS?: string;
    BORDER_COLOR?: string;
    BOX_SHADOW?: string;
    LOADER?: {
      BORDER_COLOR?: string;
      BACKGROUND?: string;
    };
    SCROLL?: {
      BACKGROUND?: string;
      SLIDER_COLOR?: string;
    };
  };
  TOP?: {
    RIGHT?: {
      BACKGROUND?: string;
      BORDER_COLOR?: string;
      FONT_COLOR?: string;
      INPUT?: {
        BORDER_RADIUS?: string;
        BACKGROUND?: string;
        BORDER_COLOR?: string;
        BOX_SHADOW?: string;
        FONT_COLOR?: string;
      };
    };
    LEFT?: {
      BACKGROUND?: string;
      BORDER_COLOR?: string;
      FONT_COLOR?: string;
      INPUT?: {
        BORDER_RADIUS?: string;
        BACKGROUND?: string;
        BORDER_COLOR?: string;
        BOX_SHADOW?: string;
        FONT_COLOR?: string;
      };
    };
  };
  BOTTOM?: {
    BACKGROUND?: string;
    BORDER_COLOR?: string;
    FONT_COLOR?: string;
    NEW_ACTIVITY_SECTION?: {
      BACKGROUND?: string;
    };
    ACTIVITY?: {
      BACKGROUND?: string;
      BORDER_COLOR?: string;
    };
    PROFILE?: {
      BACKGROUND?: string;
    };
    INPUT?: {
      BORDER_RADIUS?: string;
      BACKGROUND?: string;
      BORDER_COLOR?: string;
      BOX_SHADOW?: string;
      FONT_COLOR?: string;
    };
  };
}
