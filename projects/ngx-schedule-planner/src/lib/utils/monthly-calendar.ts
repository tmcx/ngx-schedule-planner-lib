import moment from 'moment';
import { IColumn } from '../modules/right-panel/components/header/header.interface';
import { arrayOf } from './functions';
import { setDate } from './moment';

export class MonthlyCalendar {
  static getColumns(date: Date): IColumn[] {
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
          })
        ),
      });
    }
    const desiredMonth = moment(date).format('MMMM');
    return columns.filter((column) => column.title == desiredMonth);
  }
}
