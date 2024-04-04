import moment from 'moment';
import { IColumn } from '../modules/calendar/header/components/header-grid/header-grid.interface';
import { getWeekDays } from './moment';

export class WeeklyCalendar {
  static getColumns(date: Date): IColumn[] {
    const columns: IColumn[] = [];

    const currentYear = moment(date).year();
    const startWeek = moment(date).startOf('M').week();
    const endWeek = moment(date).endOf('M').week();
    for (let stWeek = startWeek; stWeek < endWeek + 1; stWeek++) {
      const days = getWeekDays(currentYear, stWeek);
      columns.push({
        title: (stWeek - startWeek + 1).toString() + ' week',
        subColumns: days.map(({ name, num, date }) => ({
          label: `${name}, ${num}`,
          firstDate: date,
          lastDate: moment(date).startOf('d').add(12, 'h').toDate(),
        })),
      });
    }
    const desiredWeek =
      (moment(date).week() - moment(date).startOf('M').week() + 1).toString() +
      ' week';
    return columns.filter((column) => column.title == desiredWeek);
  }
}
