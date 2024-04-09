export interface IContent {
  profile: IProfile;
  groups: IGroup[];
}

export interface IProfile {
  id: number;
  name: string;
  description: string;
  tags: {
    id: number;
    name: string;
  }[];
  imageUrl: string;
}

export interface IGroup {
  name: string;
  id: number;
  icon: string;
  activities: IActivity[];
  style?: { height: number };
}

export interface IActivity {
  id: number;
  name: string;
  durationInMin: number;
  startDate: Date;
  endDate: Date;
  repeat: string[];
  tags: ITag[];
  [key: string]: IIconText | string | number | any;
}

export interface IIconText {
  icon: string;
  text: string;
}

export interface ITag {
  id: number;
  icon: string;
  name: string;
}

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

export interface ICIConText {
  valuePath: string;
  isArray?: boolean;
  type: 'icon-text';
}

export interface ICDate {
  valuePath: string;
  isArray?: boolean;
  format: string;
  type: 'date';
}
