import moment from 'moment';
import { IColumn } from '../modules/right-panel/components/header/header.interface';
import { arrayOf } from './functions';

export class MonthlyCalendar {
  static getColumns(date: Date): IColumn[] {
    const columns: IColumn[] = [];
    for (const month of moment.months()) {
      columns.push({
        title: month,
        subColumns: arrayOf(moment(date).daysInMonth() - 1, 1).map(
          (day, i) => ({
            label: day,
            firstDate: moment(date).startOf('d').add(i, 'd').toDate(),
            lastDate: moment(date)
              .startOf('d')
              .add(i + 12, 'h')
              .toDate(),
          })
        ),
      });
    }
    const desiredMonth = moment(date).format('MMMM');
    console.log(columns);
    return columns.filter((column) => column.title == desiredMonth);
  }
}
