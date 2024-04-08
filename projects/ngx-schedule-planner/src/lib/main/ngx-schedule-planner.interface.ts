export interface IProcessedContent {
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
  groupedActivities: IActivity[][];
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
  tags: {
    id: number;
    icon: string;
    name: string;
  }[];
}
