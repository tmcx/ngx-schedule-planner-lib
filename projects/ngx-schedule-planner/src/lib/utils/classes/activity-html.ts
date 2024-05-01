import { IActivity, IIconText, ITag } from '../../main/internal.interfaces';
import { EMode } from '../../sections/top-panel/components/right-panel/right-panel.interface';
import { CalendarService } from '../../services/calendar/calendar.service';
import { getValueOfObjectByPath } from '../functions';
import { format } from '../moment';
import moment from 'moment';

export class ActivityHTML {
  constructor(public calendarService: CalendarService) {}

  activityHTMLContent(activity: IActivity) {
    const INLINE_SHOW =
      this.calendarService.config.customization?.CALENDAR?.ACTIVITY
        ?.INLINE_SHOW;
    if (!INLINE_SHOW) {
      return `<section class="text"><p title="${activity.name}">${activity.name}</p></section>`;
    }

    let htmlContent = '';
    for (const customization of INLINE_SHOW) {
      const { type, valuePath, isArray } = customization;
      switch (type) {
        case 'icon-tag':
          htmlContent += '<section class="tags">';
          if (isArray) {
            const tags = getValueOfObjectByPath<ITag[]>(activity, valuePath);
            for (const tag of tags) {
              htmlContent += `<span title="${tag.name}">${tag.icon}</span>`;
            }
          } else {
            const tag = getValueOfObjectByPath<ITag>(activity, valuePath);
            htmlContent += `<span title="${tag.name}">${tag.icon}</span>`;
          }
          htmlContent += '</section>';
          break;
        case 'text':
          htmlContent += '<section class="text">';
          if (isArray) {
            const texts = getValueOfObjectByPath<string[]>(activity, valuePath);
            for (const text of texts) {
              htmlContent += `<p title="${text}">${text}</p>`;
            }
          } else {
            const text = getValueOfObjectByPath<string>(activity, valuePath);
            htmlContent += `<p title="${text}">${text}</p>`;
          }
          htmlContent += '</section>';
          break;
        case 'icon-text':
          htmlContent += '<section class="icon-texts">';
          if (isArray) {
            const texts = getValueOfObjectByPath<IIconText[]>(
              activity,
              valuePath
            );
            for (const text of texts) {
              htmlContent += `<p title="${text.text}">${text.icon} ${text.text}</p>`;
            }
          } else {
            const text = getValueOfObjectByPath<IIconText>(activity, valuePath);
            if (text) {
              htmlContent += `<p title="${text.text}">${text.icon} ${text.text}</p>`;
            }
          }
          htmlContent += '</section>';
          break;
        case 'date':
          htmlContent += '<section class="dates">';
          const defaultFormat = customization.format ?? 'YYYY-MM-DD HH:mm';
          if (isArray) {
            const dates = getValueOfObjectByPath<string[]>(activity, valuePath);
            for (const date of dates) {
              htmlContent += `<p>${format(date, defaultFormat)}</p>`;
            }
          } else {
            const date = getValueOfObjectByPath<string>(activity, valuePath);
            htmlContent += `<p>${format(date, defaultFormat)}</p>`;
          }
          htmlContent += '</section>';
          break;
      }
    }

    return htmlContent;
  }

  activityStyle(activity: IActivity) {
    let {
      activity: {
        factor: { width: widthFactor },
      },
      interval: {
        global: { startDate },
        timeRange: daily,
        hoursAmount,
      },
    } = this.calendarService.config;
    const leftMinutes = calculateLeftMinutes(
      daily,
      startDate,
      activity.startDate
    );
    const minutes = calculateDurationMinutes(
      daily,
      activity.startDate,
      activity.endDate
    );
    const daysOfMonth = moment(activity.startDate).daysInMonth();
    widthFactor = widthFactor
      .replace('{hoursAmount}', hoursAmount + '')
      .replace('{daysOfMonth}', daysOfMonth + '');
    return {
      width: `calc((${widthFactor}) * ${minutes})`,
      left: `calc((${widthFactor}) * ${leftMinutes})`,
    };
  }

  calendarTitle() {
    let title = '';
    const referenceDate = this.calendarService.config.referenceDate;
    switch (this.calendarService.config.mode) {
      case EMode.monthly:
        title = format(referenceDate, 'YYYY, MMMM');
        break;
      case EMode.weekly:
        const week =
          moment(referenceDate).week() -
          moment(referenceDate).startOf('M').week();
        title = `${format(referenceDate, 'YYYY, MMMM')}, ${week + 1} week`;
        break;
      case EMode.daily:
        title = format(referenceDate, 'YYYY, MMMM, dddd D');
        break;
    }

    return title;
  }
}

export function calculateLeftMinutes(
  interval: { hrFrom: number; hrTo: number },
  baseDate: Date,
  actStartDate: Date
): number {
  const { hrFrom, hrTo } = interval;
  let copyBaseDate = moment(baseDate);
  let ignoreMins = 0;
  while (copyBaseDate.date() < moment(actStartDate).date()) {
    ignoreMins += copyBaseDate
      .clone()
      .set({ hour: hrFrom })
      .diff(copyBaseDate.clone().startOf('d'), 'm');
    ignoreMins += copyBaseDate
      .clone()
      .endOf('d')
      .diff(copyBaseDate.clone().set({ hour: hrTo }), 'm');
    copyBaseDate.add({ d: 1 });
  }
  return moment(actStartDate).diff(baseDate, 'm') - ignoreMins;
}

export function calculateDurationMinutes(
  interval: { hrFrom: number; hrTo: number },
  actStartDate: Date,
  actEndDate: Date
): number | null {
  const { hrFrom, hrTo } = interval;
  let copyActStartDate = moment(actStartDate);
  let sumMins = 0;
  while (copyActStartDate.date() < moment(actEndDate).date()) {
    sumMins += copyActStartDate
      .clone()
      .set({ hour: hrFrom })
      .diff(copyActStartDate.clone().startOf('d'), 'm');
    sumMins += copyActStartDate
      .clone()
      .endOf('d')
      .diff(copyActStartDate.clone().set({ hour: hrTo }), 'm');
    copyActStartDate.add({ d: 1 });
  }
  return moment(actEndDate).diff(actStartDate, 'minutes') - sumMins;
}
