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
      name: format(date, 'dddd'),
      num: +format(date, 'D'),
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
      name: format(day, 'dddd'),
      num: +format(day, 'D'),
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

export function setDate(
  date: Date | string,
  attrs: { [key in moment.unitOfTime.Base]?: number } | null = null
) {
  let momentDate = moment(date);
  if (attrs != null) {
    Object.keys(attrs).forEach((key: any) => {
      const value = (attrs as any)[key];
      momentDate = momentDate.set(key, value);
    });
  }
  return momentDate.toDate();
}

export function isBetween(
  date: string | Date,
  from: Date,
  to: Date,
  inclusive = true
) {
  return moment(date).isBetween(
    from,
    to,
    undefined,
    inclusive ? '[]' : undefined
  );
}

export function startOf(date: Date, unitOfTime: moment.unitOfTime.StartOf) {
  return moment(date).startOf(unitOfTime).toDate();
}

export function format(date: Date | moment.Moment | string, format?: string) {
  return format ? moment(date).format(format) : moment(date).format();
}
