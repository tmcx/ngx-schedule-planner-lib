import { IColumn } from '../modules/calendar/header/components/header-grid/header-grid.interface';
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
        subColumns: arrayOf(23, 1).map((hr, i) => ({
          label: hr,
          firstDate: moment(date)
            .startOf('d')
            .add(i + 1, 'h')
            .toDate(),
          lastDate: moment(date)
            .startOf('d')
            .add(i + 1, 'h')
            .add(30, 'm')
            .toDate(),
        })),
      });
    }
    const desiredDay = ', ' + moment(date).format('D');
    return columns.filter(({ title }) => title.endsWith(desiredDay));
  }
}
