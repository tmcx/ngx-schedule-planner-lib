import { DurationConstructor } from '../../../../utils/moment';

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

export enum ENavigationChange {
  'mode' = 'mode',
  'previous' = 'previous',
  'next' = 'next',
}
export type TPeriod = 'previous' | 'next' | 'today';

export enum EPeriod {
  'referenceDate' = 'referenceDate',
  'previous' = 'previous',
  'today' = 'today',
  'next' = 'next',
}
export interface IUnit {
  [key: string]: DurationConstructor;
}
