import { IColumn } from '../components/calendar/calendar.interface';
import { getWeekDays, moment } from './moment';

export class WeeklyCalendar {
  static getColumns(date: Date): IColumn[] {
    const columns: IColumn[] = [];
    console.log(date);

    const currentYear = moment(date).year();
    const startWeek = moment(date).startOf('M').week();
    const endWeek = moment(date).endOf('M').week();
    for (let stWeek = startWeek; stWeek < endWeek + 1; stWeek++) {
      const days = getWeekDays(currentYear, stWeek);
      columns.push({
        title: (stWeek - startWeek).toString(),
        subColumns: days.map(({ name, num }) => `${name}, ${num}`),
      });
    }
    const desiredWeek = (
      moment(date).week() - moment(date).startOf('M').week()
    ).toString();
    return columns.filter((column) => column.title == desiredWeek);
  }
}
