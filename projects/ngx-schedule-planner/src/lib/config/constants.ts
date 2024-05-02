import { IConstants, ISelectors } from '../main/internal.interfaces';
import { EEvent } from '../services/calendar/calendar.interface';
import { MonthlyCalendar } from '../utils/monthly-calendar';
import { WeeklyCalendar } from '../utils/weekly-calendar';
import { DailyCalendar } from '../utils/daily-calendar';

export const CONFIG: IConstants = {
  CALENDAR: {
    monthly: {
      ACTIVITY: {
        FACTOR: { WIDTH: '(100% / ({hoursAmount} * 60)) / {daysOfMonth}' },
      },
      ENTITY: [MonthlyCalendar, 'month'],
    },
    weekly: {
      ACTIVITY: { FACTOR: { WIDTH: '100% / (7 * {hoursAmount} * 60)' } },
      ENTITY: [WeeklyCalendar, 'week'],
    },
    daily: {
      ACTIVITY: { FACTOR: { WIDTH: '(100% / ({hoursAmount} * 60))' } },
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

export const THEME = {
  GLOBAL: {
    BACKGROUND: '#FFFFFF',
    BORDER_RADIUS: '5px',
    BOX_SHADOW: '0px 0px 4px #004b8757',
  },
  TOP: {
    RIGHT: {
      BACKGROUND: '#1D7AE4',
      BORDER_COLOR: '#FFFFFF',
      FONT_COLOR: '#FFFFFF',
      INPUT: {
        BORDER_RADIUS: '4px',
        BACKGROUND: '#FFFFFF',
        BORDER_COLOR: 'transparent',
        BOX_SHADOW: 'none',
        FONT_COLOR: '#000000',
      },
    },
    LEFT: {
      BACKGROUND: '#FFFFFF',
      BORDER_COLOR: '#1D7AE4',
      FONT_COLOR: '#000000',
      INPUT: {
        BORDER_RADIUS: '4px',
        BACKGROUND: '#FFFFFF',
        BORDER_COLOR: '#b9b9b9',
        BOX_SHADOW: 'none',
        FONT_COLOR: '#000000',
      },
    },
  },
  BOTTOM: {
    BACKGROUND: '#1D7AE4',
    BORDER_COLOR: '#E8E8E8',
    FONT_COLOR: '#FFFFFF',
    NEW_ACTIVITY_SECTION: {
      BACKGROUND: '#d4ffd4',
    },
    ACTIVITY: {
      BACKGROUND: '#FFFFFF',
    },
    PROFILE: {
      BACKGROUND: '#FAFAFA',
    },
  },
};

export const THEME_VARS = {
  GLOBAL: {
    BACKGROUND: '--global-background',
    BORDER_RADIUS: '--global-border-radius',
    BOX_SHADOW: '--global-box-shadow',
  },
  TOP: {
    RIGHT: {
      BACKGROUND: '--top-right-background',
      BORDER_COLOR: '--top-right-border-color',
      FONT_COLOR: '--top-right-font-color',
      INPUT: {
        BORDER_RADIUS: '--top-right-button-border-radius',
        BACKGROUND: '--top-right-button-background',
        BORDER_COLOR: '--top-right-button-border-color',
        BOX_SHADOW: '--top-right-button-box-shadow',
        FONT_COLOR: '--top-right-button-font-color',
      },
    },
    LEFT: {
      BACKGROUND: '--top-left-background',
      BORDER_COLOR: '--top-left-border-color',
      FONT_COLOR: '--top-left-font-color',
      INPUT: {
        BORDER_RADIUS: '--top-left-button-border-radius',
        BACKGROUND: '--top-left-button-background',
        BORDER_COLOR: '--top-left-button-border-color',
        BOX_SHADOW: '--top-left-button-box-shadow',
        FONT_COLOR: '--top-left-button-font-color',
      },
    },
  },
  BOTTOM: {
    BACKGROUND: '--bottom-background-color',
    BORDER_COLOR: '--bottom-border-color',
    FONT_COLOR: '--bottom-font-color',
    NEW_ACTIVITY_SECTION: {
      BACKGROUND: '--bottom-new-activity-section-background-color',
    },
    ACTIVITY: {
      BACKGROUND: '--bottom-activity-background-color',
    },
    PROFILE: {
      BACKGROUND: '--bottom-profile-background-color',
    },
  },
};
