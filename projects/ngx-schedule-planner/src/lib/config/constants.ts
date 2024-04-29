import { IConstants, ISelectors, IThemes } from '../main/internal.interfaces';
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
  STYLE_VAR: {
    ASPECT: {
      HEADER_WIDTH_COLLAPSED: '--header-width-collapsed',
      SCROLL_HEIGHT: '--scroll-height',
      HEADER_HEIGHT: '--header-height',
      HEADER_WIDTH: '--header-width',
      BORDER_RADIUS: '--border-radius',
    },
    THEME: {
      PROFILE: {
        HORIZONTAL_SPACING: '--act-horizontal-spacing',
        VERTICAL_SPACING: '--act-vertical-spacing',
        BOX_SHADOW: '--act-box-shadow',
      },
      ACTIVITY: {
        BACKGROUND_COLOR: '--act-bg-color',
        FONT_COLOR: '--act-font-color',
        NEW_ACTIVITY_LINE: { BACKGROUND_COLOR: '--act-new-line-bg-color' },
      },
      HEADER: {
        BACKGROUND_COLOR: '--header-bg-color',
      },
      BODY: {
        BACKGROUND_COLOR: '--body-bg-color',
      },
      GLOBAL: {
        BACKGROUND_COLOR: '--background-color',
        LOADER_BG_COLOR: '--loader-bg-color',
        SCROLLBAR_COLOR: '--scrollbar-color',
        BORDER_COLOR: '--border-color',
        FONT_COLOR: '--font-color',
      },
    },
  },

  ASPECT: {
    HEADER_WIDTH_COLLAPSED: '47px',
    HEADER_HEIGHT: '149px',
    HEADER_WIDTH: '350px',
    SCROLL_HEIGHT: '17px',
    BORDER_RADIUS: '5px',
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

export const THEME: IThemes = {
  DARK: {
    PROFILE: {
      BOX_SHADOW: '0px 0px 0px 1px #b2b2b2',
      HORIZONTAL_SPACING: '10px',
      VERTICAL_SPACING: '10px',
    },
    ACTIVITY: {
      BACKGROUND_COLOR: 'transparent',
      FONT_COLOR: 'white',
      NEW_ACTIVITY_LINE: { BACKGROUND_COLOR: '#00ffe938' },
    },
    HEADER: {
      BACKGROUND_COLOR: '#222222',
    },
    BODY: {
      BACKGROUND_COLOR: '#222222',
    },
    GLOBAL: {
      BACKGROUND_COLOR: '#222222',
      LOADER_BG_COLOR: '#5e5e5e',
      BORDER_COLOR: '#b2b2b2',
      SCROLLBAR_COLOR: 'white',
      FONT_COLOR: '#FFFFFF',
    },
  },
  LIGHT: {
    PROFILE: {
      BOX_SHADOW: '0px 0px 0px 1px #b2b2b2',
      HORIZONTAL_SPACING: '0px',
      VERTICAL_SPACING: '0',
    },
    ACTIVITY: {
      BACKGROUND_COLOR: 'red',
      FONT_COLOR: 'blue',
      NEW_ACTIVITY_LINE: { BACKGROUND_COLOR: '#12BC79' },
    },
    HEADER: {
      BACKGROUND_COLOR: '#F4E1CC',
    },
    BODY: {
      BACKGROUND_COLOR: '#fffbf5',
    },
    GLOBAL: {
      BACKGROUND_COLOR: '#222222',
      LOADER_BG_COLOR: '#5e5e5e',
      SCROLLBAR_COLOR: 'red',
      BORDER_COLOR: '#ABA18F',
      FONT_COLOR: '#222222',
    },
  },
};
