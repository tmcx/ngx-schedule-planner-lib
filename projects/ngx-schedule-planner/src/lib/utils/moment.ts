import moment from 'moment';

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

export function addToDate(
  date: Date,
  attrs: { [key in moment.unitOfTime.Base]?: number } | null = null,
  position?: { startOf: moment.unitOfTime.StartOf[] }
) {
  let momentDate = moment(date);
  if (position && position['startOf'].length) {
    for (const unitOfTime of position.startOf) {
      momentDate = momentDate.startOf(unitOfTime);
    }
  }
  if (attrs != null) {
    Object.keys(attrs).forEach((key: any) => {
      const value = (attrs as any)[key];
      momentDate = momentDate.add(value, key);
    });
  }
  return momentDate.toDate();
}
