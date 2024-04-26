import { DurationConstructor } from '../../../../../lib/utils/moment';

export type TModes = [TMode, DurationConstructor][];

export type TMode = 'monthly' | 'weekly' | 'daily';

export enum EMode {
  monthly = 'monthly',
  weekly = 'weekly',
  daily = 'daily',
}

export interface IColumn {
  title: string;
  subColumns: ISubColumn[];
}

export interface ISubColumn {
  label: string | number;
  firstSection: { start: Date; end: Date };
  lastSection: { start: Date; end: Date };
}

export type TNavigationChange = 'mode' | 'previous' | 'next';

export enum EPeriod {
  'referenceDate' = 'referenceDate',
  'previous' = 'previous',
  'today' = 'today',
  'next' = 'next',
}
