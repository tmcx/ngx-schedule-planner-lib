export type TMode = 'monthly' | 'weekly' | 'daily';

export enum EMode {
  monthly = 'monthly',
  weekly = 'weekly',
  daily = 'daily',
}

export interface IColumn {
  title: string;
  subColumns: (number | string)[];
}

export type TNavigationChange = 'mode' | 'prev' | 'next';

export enum ENavigationChange {
  'mode' = 'mode',
  'prev' = 'prev',
  'next' = 'next',
}
export type TPeriod = 'previous' | 'next';

export enum EPeriod {
  'referenceDate' = 'referenceDate',
  'previous' = 'previous',
  'next' = 'next',
}
