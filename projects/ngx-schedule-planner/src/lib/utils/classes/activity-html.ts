import { inject } from '@angular/core';
import {
  IActivity,
  IIconText,
  ITag,
} from '../../main/ngx-schedule-planner.interface';
import { CalendarService } from '../../services/calendar/calendar.service';
import { getValueOfObjectByPath } from '../functions';
import { EMode } from '../../modules/right-panel/components/header/header.interface';
import moment from 'moment';

export class ActivityHTML {
  calendarService: CalendarService;

  constructor() {
    this.calendarService = inject(CalendarService);
  }

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
            htmlContent += `<p title="${text.text}">${text.icon} ${text.text}</p>`;
          }
          htmlContent += '</section>';
          break;
      }
    }

    return htmlContent;
  }

  activityStyles(activity: IActivity) {
    const minutes = activity.durationInMin;
    const {
      activity: {
        factor: { width: widthFactor },
      },
    } = this.calendarService.config;
    let left = '';
    let width = '';
    let leftMinutes = moment(activity.startDate).diff(
      moment(activity.startDate).startOf('d'),
      'm'
    );
    switch (this.calendarService.config.mode) {
      case EMode.monthly:
        const daysOfMonth = moment(activity.startDate).daysInMonth();
        leftMinutes -= 60;

        width = `calc((${widthFactor}/${daysOfMonth}) * ${minutes})`;
        left = `calc((${widthFactor}/${daysOfMonth}) * ${leftMinutes})`;
        break;
      case EMode.weekly:
        width = `calc((${widthFactor}) * ${minutes})`;
        left = `calc((${widthFactor}) * ${leftMinutes})`;
        break;
      case EMode.daily:
        leftMinutes -= 60;
        width = `calc((${widthFactor}) * ${minutes})`;
        left = `calc((${widthFactor}) * ${leftMinutes})`;
        break;
    }
    return { width, left };
  }
}