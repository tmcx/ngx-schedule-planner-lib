import {
  EMode,
  EPeriod,
} from '../modules/right-panel/components/header/header.interface';
import { DurationConstructor } from './moment';

export class BaseVariables {
  units: { [key: string]: DurationConstructor } = {
    [EMode.monthly]: 'month',
    [EMode.weekly]: 'week',
    [EMode.daily]: 'day',
  };
  period = EPeriod;
}
