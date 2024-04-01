import { EMode, EPeriod } from '../components/calendar/calendar.interface';
import { DurationConstructor } from './moment';

export class BaseVariables {
  units: { [key: string]: DurationConstructor } = {
    [EMode.monthly]: 'month',
    [EMode.weekly]: 'week',
    [EMode.daily]: 'day',
  };
  period = EPeriod;
}
