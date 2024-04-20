import { IConstants } from '../main/internal.interfaces';

export const CONFIG: IConstants = {
  CALENDAR: {
    monthly: {
      ACTIVITY: { FACTOR: { WIDTH: '(100% / (24 * 60))' } },
    },
    weekly: {
      ACTIVITY: { FACTOR: { WIDTH: '(100% / (7 * 24 * 60))' } },
    },
    daily: {
      ACTIVITY: { FACTOR: { WIDTH: '(100% / (24 * 60))' } },
    },
  },
  STYLE: {
    '--ngx-header-width-collapsed': '47px',
    '--ngx-sp-host-bg-color': '#222222',
    '--ngx-sp-border-color': '#b2b2b2',
    '--ngx-header-height': '149px',
    '--ngx-header-width': '350px',
    '--ngx-scroll-height': '17px',
  },
};
