import moment from 'moment';
import { IColumn } from '../modules/right-panel/components/header/header.interface';
import { arrayOf } from './functions';
import { addToDate, getDaysOfMonth } from './moment';

export class DailyCalendar {
  static getColumns(date: Date): IColumn[] {
    const columns: IColumn[] = [];
    const currentYear = moment(date).year();
    const currentMonth = moment(date).month();
    const days = getDaysOfMonth(currentYear, currentMonth);
    for (const { name, num } of days) {
      columns.push({
        title: `${name}, ${num}`,
        subColumns: arrayOf(23, 1).map((hr, i) => ({
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
    const desiredDay = ', ' + moment(date).format('D');
    return columns.filter(({ title }) => title.endsWith(desiredDay));
  }
}
