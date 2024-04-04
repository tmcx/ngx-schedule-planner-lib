import { IColumn } from '../modules/calendar/header/components/header-grid/header-grid.interface';
import { arrayOf } from './functions';
import { moment } from './moment';

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
    return columns.filter((column) => column.title == desiredMonth);
  }
}
