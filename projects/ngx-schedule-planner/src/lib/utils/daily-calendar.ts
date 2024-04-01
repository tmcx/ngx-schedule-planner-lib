import { IColumn } from '../components/calendar/calendar.interface';
import { arrayOf } from './functions';
import { moment, getDaysOfMonth } from './moment';

export class DailyCalendar {
  static getColumns(date: Date): IColumn[] {
    const columns: IColumn[] = [];
    const currentYear = moment(date).year();
    const currentMonth = moment(date).month();
    const days = getDaysOfMonth(currentYear, currentMonth);
    for (const { name, num } of days) {
      columns.push({
        title: `${name}, ${num}`,
        subColumns: arrayOf(23, 1),
      });
    }
    const desiredDay = ', ' + moment(date).format('D');
    return columns.filter(({ title }) => title.endsWith(desiredDay));
  }
}
