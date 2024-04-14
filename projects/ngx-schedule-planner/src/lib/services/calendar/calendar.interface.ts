import {
  TNavigationChange,
  EPeriod,
  TMode,
} from '../../modules/right-panel/components/header/header.interface';
import { ISelectedRange } from '../../modules/right-panel/components/body/body.interface';
import { Subject } from 'rxjs';
import { IProcessedContent } from '../../main/ngx-schedule-planner.interface';

export interface ICalendarServiceEvents {
  navigationChange: Subject<TNavigationChange>;
  selectRange: Subject<ISelectedRange>;
  addActivityClick: Subject<void>;
  periodChange: Subject<EPeriod>;
  modeChange: Subject<TMode>;
  contentChange: Subject<{
    filtered: IProcessedContent[];
    all: IProcessedContent[];
  }>;
}
