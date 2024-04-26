import { IConstants } from '../main/internal.interfaces';
import { EEvent } from '../services/calendar/calendar.interface';

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
    '--ngx-loader-bg-color': '#5e5e5e',
    '--ngx-header-height': '149px',
    '--ngx-header-width': '350px',
    '--ngx-scroll-height': '17px',
  },
  eventGroups: {
    SUB_COLUMNS: [
      EEvent.afterRefreshCalendarContent,
      EEvent.referenceDate,
      EEvent.navigation,
      EEvent.period,
      EEvent.mode,
    ],
  },
};
