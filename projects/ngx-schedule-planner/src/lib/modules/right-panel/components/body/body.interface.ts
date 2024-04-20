import {
  IProcessedContent,
  IGroup,
  IProfile,
} from '../../../../main/internal.interfaces';

export interface ICreatingActivity {
  group: IProcessedContent['groups'][0] | null;
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
