export interface IContent {
  profile: IProfile;
  groups: IGroup[];
}

export interface IProfile {
  id: number;
  name: string;
  description: string;
  tags: ITag[];
  imageUrl: string;
}

export interface ITag {
  id: number;
  name: string;
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
  startDate: Date;
  endDate: Date;
  repeat: string[];
  tags: IActivityTag[];
}

export interface IActivityTag {
  id: number;
  icon: string;
  name: string;
}

export interface ICreatingActivity {
  group: IContent['groups'][0] | null;
  fromRefDate: Date | null;
  toRefDate: Date | null;
  profile: IProfile | null;
  isCreating: boolean;
}

export interface ISelectedRange {
  profile: IProfile;
  startDate: Date;
  endDate: Date;
  group: IGroup;
}
