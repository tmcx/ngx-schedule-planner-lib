import { IConstants } from '../main/ngx-schedule-planner.interface';

export const CONFIG: IConstants = {
  monthly: {
    ACTIVITY: { FACTOR: { WIDTH: '(100% / (24 * 60))' } },
  },
  weekly: {
    ACTIVITY: { FACTOR: { WIDTH: '(100% / (7 * 24 * 60))' } },
  },
  daily: {
    ACTIVITY: { FACTOR: { WIDTH: '(100% / (24 * 60))' } },
  },
};
