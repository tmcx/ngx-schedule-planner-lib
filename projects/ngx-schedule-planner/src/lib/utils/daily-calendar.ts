import moment from 'moment';
import { addToDate, format, getDaysOfMonth } from './moment';
import { arrayOf } from './functions';
import { IColumn } from '../sections/top-panel/components/right-panel/right-panel.interface';
import { CalendarService } from '../services/calendar/calendar.service';

export class DailyCalendar {
  static getColumns(calendarService: CalendarService): IColumn[] {
    const {
      global: { startDate, endDate },
    } = calendarService.config.interval;
    const length = endDate.getHours() - startDate.getHours();

    const startHr = startDate.getHours();
    const columns: IColumn[] = [];
    const currentYear = moment(startDate).year();
    const currentMonth = moment(startDate).month();
    const days = getDaysOfMonth(currentYear, currentMonth);
    for (const { name, num } of days) {
      columns.push({
        title: `${name}, ${num}`,
        subColumns: arrayOf(length).map((hr, i) => ({
          label: `${hr + startHr}:00`,
          firstSection: {
            start: addToDate(startDate, { h: i }),
            end: addToDate(startDate, { h: i, m: 30 }),
          },
          lastSection: {
            start: addToDate(startDate, { h: i, m: 31 }),
            end: addToDate(startDate, { h: i, m: 59 }),
          },
          style: { minWidth: '40px' },
        })),
      });
    }
    const desiredDay = ', ' + format(startDate, 'D');
    return columns.filter(({ title }) => title.endsWith(desiredDay));
  }
}
