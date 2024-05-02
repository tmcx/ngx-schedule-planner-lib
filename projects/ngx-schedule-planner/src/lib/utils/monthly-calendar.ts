import moment from 'moment';
import { setDate, format } from './moment';
import { arrayOf } from './functions';
import { IColumn } from '../sections/top-panel/components/right-panel/right-panel.interface';
import { CalendarService } from '../services/calendar/calendar.service';

export class MonthlyCalendar {
  static getColumns(calendarService: CalendarService): IColumn[] {
    const date = calendarService.config.interval.global.startDate;

    const columns: IColumn[] = [];
    for (const month of moment.months()) {
      columns.push({
        title: month,
        subColumns: arrayOf(moment(date).daysInMonth() - 1, 1).map(
          (day, i) => ({
            label: day,
            firstSection: {
              start: setDate(date, { d: i + 1, h: 0, m: 0 }),
              end: setDate(date, { d: i + 1, h: 12, m: 0 }),
            },
            lastSection: {
              start: setDate(date, { d: i + 1, h: 12, m: 1 }),
              end: setDate(date, { d: i + 1, h: 23, m: 59 }),
            },
            style: { minWidth: '40px' },
          })
        ),
      });
    }
    const desiredMonth = format(date, 'MMMM');
    return columns.filter((column) => column.title == desiredMonth);
  }
}
