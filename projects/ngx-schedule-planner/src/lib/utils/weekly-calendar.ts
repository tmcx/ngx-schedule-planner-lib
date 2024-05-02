import moment from 'moment';
import { addToDate, getWeekDays } from './moment';
import { IColumn } from '../sections/top-panel/components/right-panel/right-panel.interface';
import { CalendarService } from '../services/calendar/calendar.service';

export class WeeklyCalendar {
  static getColumns(calendarService: CalendarService): IColumn[] {
    const date = calendarService.config.interval.global.startDate;

    const columns: IColumn[] = [];
    const currentYear = moment(date).year();
    const startWeek = moment(date).startOf('M').week();
    const endWeek = moment(date).endOf('M').week();
    for (let stWeek = startWeek; stWeek < endWeek + 1; stWeek++) {
      const days = getWeekDays(currentYear, stWeek);
      columns.push({
        title: (stWeek - startWeek + 1).toString() + ' week',
        subColumns: days.map(({ name, num, date }) => ({
          label: `${name}, ${num}`,
          firstSection: {
            start: date,
            end: addToDate(date, { h: 12 }, { startOf: ['d'] }),
          },
          lastSection: {
            start: addToDate(date, { h: 12, m: 1 }, { startOf: ['d'] }),
            end: addToDate(date, { h: 23, m: 59 }, { startOf: ['d'] }),
          },
          style: { minWidth: '110px' },
        })),
      });
    }
    const desiredWeek =
      (moment(date).week() - moment(date).startOf('M').week() + 1).toString() +
      ' week';
    return columns.filter((column) => column.title == desiredWeek);
  }
}
