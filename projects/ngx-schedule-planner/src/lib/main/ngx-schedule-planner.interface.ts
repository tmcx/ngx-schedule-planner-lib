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
}

export interface IActivity {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  repeat: string[];
  tags: IActivityTag[];
}

export interface IActivityTag {
  id: number;
  icon: string;
  name: string;
}

export interface ICreatingActivity {
  isCreating: boolean;
  group: IContent['groups'][0] | null;
  fromRefDate: Date | null;
  toRefDate: Date | null;
}

export interface ISelectedRange {
  profile: IProfile;
  startDate: Date;
  endDate: Date;
  group: IGroup;
}
