
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

interface ITag {
  tagId: number;
  icon: string;
  name: string;
}

interface IRole {
  roleId: number;
  label: string;
}

export interface CalendarContent {
  activities: { [activityId: number]: IActivity };
  groups: { [activityId: number]: IGroup };
  roles: { [roleId: number]: IRole };
  tags: { [tagId: number]: ITag };
  profiles: IProfile[];
}
