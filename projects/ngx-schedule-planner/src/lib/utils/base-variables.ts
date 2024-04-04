import {
  EMode,
  EPeriod,
} from '../modules/calendar/header/components/header-grid/header-grid.interface';
import { DurationConstructor } from './moment';

export class BaseVariables {
  units: { [key: string]: DurationConstructor } = {
    [EMode.monthly]: 'month',
    [EMode.weekly]: 'week',
    [EMode.daily]: 'day',
  };
  period = EPeriod;
}
