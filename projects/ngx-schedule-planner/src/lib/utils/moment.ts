import moment_ from 'moment';
export const moment = moment_;

export type DurationConstructor = moment.unitOfTime.DurationConstructor;

export function getDaysOfMonth(
  year: number,
  month: number
): { name: string; num: number }[] {
  const date = moment([year, month]);
  const daysInMonth = date.daysInMonth();
  const days: { name: string; num: number }[] = [];

  for (let day = 0; day < daysInMonth; day++) {
    days.push({
      name: date.format('dddd'),
      num: +date.format('D'),
    });
    date.add(1, 'd');
  }

  return days;
}

export function getWeekDays(year: number, week: number) {
  const firstDayOfWeek = moment().year(year).week(week).startOf('week');
  const days = [];
  for (let i = 0; i < 7; i++) {
    const day = firstDayOfWeek.clone().add(i, 'days');
    days.push({
      name: day.format('dddd'),
      num: +day.format('D'),
      date: day.toDate(),
    });
  }
  return days;
}
