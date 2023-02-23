import {Observable, Subscription, zip} from 'rxjs';
import {AppEvent} from "../../application.event";
import { OrchestrationStrategyFn } from '../orchestration-strategy';

export const zipEventsOrchestrationStrategy: OrchestrationStrategyFn = (
  eventObservables: Observable<AppEvent>[],
  callback: (events: AppEvent[]) => void,
): Subscription => {
  return zip(...eventObservables).subscribe(callback);
};
