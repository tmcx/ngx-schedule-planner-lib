import moment from 'moment';
import { addToDate, format, getDaysOfMonth } from './moment';
import { arrayOf } from './functions';
import { IColumn } from '../sections/top-panel/components/right-panel/right-panel.interface';

export class DailyCalendar {
  static getColumns(date: Date): IColumn[] {
    const columns: IColumn[] = [];
    const currentYear = moment(date).year();
    const currentMonth = moment(date).month();
    const days = getDaysOfMonth(currentYear, currentMonth);
    for (const { name, num } of days) {
      columns.push({
        title: `${name}, ${num}`,
        subColumns: arrayOf(23).map((hr, i) => ({
          label: `${hr}:00`,
          firstSection: {
            start: addToDate(date, { h: i }, { startOf: ['d'] }),
            end: addToDate(date, { h: i, m: 30 }, { startOf: ['d'] }),
          },
          lastSection: {
            start: addToDate(date, { h: i, m: 31 }, { startOf: ['d'] }),
            end: addToDate(date, { h: i, m: 59 }, { startOf: ['d'] }),
          },
        })),
      });
    }
    const desiredDay = ', ' + format(date, 'D');
    return columns.filter(({ title }) => title.endsWith(desiredDay));
  }
}
