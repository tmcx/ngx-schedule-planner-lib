import moment from 'moment';
import { IColumn } from '../modules/right-panel/components/header/header.interface';
import { arrayOf } from './functions';
import { addToDate } from './moment';

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
              start: addToDate(date, { d: i, h: i * 12 }, { startOf: ['d'] }),
              end: addToDate(date, { d: i, h: i + 12 }, { startOf: ['d'] }),
            },
            lastSection: {
              start: addToDate(date, { d: i, h: i + 12, m: 1 }, { startOf: ['d'] }),
              end: addToDate(date, { d: i, h: i + 23, m: 59 }, { startOf: ['d'] }),
            },
          })
        ),
      });
    }
    const desiredMonth = moment(date).format('MMMM');
    return columns.filter((column) => column.title == desiredMonth);
  }
}
