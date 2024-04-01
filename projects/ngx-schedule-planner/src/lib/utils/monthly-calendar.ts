import { IColumn } from '../components/calendar/calendar.interface';
import { arrayOf } from './functions';
import { moment } from './moment';

export class MonthlyCalendar {
  static getColumns(date: Date): IColumn[] {
    const columns: IColumn[] = [];
    for (const month of moment.months()) {
      columns.push({
        title: month,
        subColumns: arrayOf(moment(date).daysInMonth() - 1, 1),
      });
    }
    const desiredMonth = moment(date).format('MMMM');
    return columns.filter((column) => column.title == desiredMonth);
  }
}
