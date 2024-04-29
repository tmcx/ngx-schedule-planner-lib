import { IConstants, ISelectors } from '../main/internal.interfaces';
import { EEvent } from '../services/calendar/calendar.interface';
import { MonthlyCalendar } from '../utils/monthly-calendar';
import { WeeklyCalendar } from '../utils/weekly-calendar';
import { DailyCalendar } from '../utils/daily-calendar';

export const CONFIG: IConstants = {
  CALENDAR: {
    monthly: {
      ACTIVITY: { FACTOR: { WIDTH: '(100% / (24 * 60))' } },
      ENTITY: [MonthlyCalendar, 'month'],
    },
    weekly: {
      ACTIVITY: { FACTOR: { WIDTH: '(100% / (7 * 24 * 60))' } },
      ENTITY: [WeeklyCalendar, 'week'],
    },
    daily: {
      ACTIVITY: { FACTOR: { WIDTH: '(100% / (24 * 60))' } },
      ENTITY: [DailyCalendar, 'day'],
    },
  },
  STYLE_VAR: {
    HEADER_WIDTH_COLLAPSED: '--ngx-header-width-collapsed',
    SP_HOST_BG_COLOR: '--ngx-sp-host-bg-color',
    SP_BORDER_COLOR: '--ngx-sp-border-color',
    LOADER_BG_COLOR: '--ngx-loader-bg-color',
    HEADER_HEIGHT: '--ngx-header-height',
    HEADER_WIDTH: '--ngx-header-width',
    SCROLL_HEIGHT: '--ngx-scroll-height',
  },
  STYLE: {
    HEADER_WIDTH_COLLAPSED: '47px',
    SP_HOST_BG_COLOR: '#222222',
    SP_BORDER_COLOR: '#b2b2b2',
    LOADER_BG_COLOR: '#5e5e5e',
    HEADER_HEIGHT: '110px',
    HEADER_WIDTH: '350px',
    SCROLL_HEIGHT: '17px',
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
export var SELECTOR: ISelectors = {
  HOST: `#{uuid}`,
  BOTTOM_PANEL_ROW: `#{uuid} app-bottom-panel .group .row`,
  APP_RIGHT_PANEL: `#{uuid} app-top-panel app-right-panel`,
  APP_MARKER: `#{uuid} app-bottom-panel app-marker`,
  BOTTOM_PANEL: `#{uuid} app-bottom-panel`,
};
