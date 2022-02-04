import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { DateTime, Duration, Interval } from 'luxon';
import { combineLatest, map, Observable, switchMap, timer } from 'rxjs';
import { DanishDateStore } from '@nrg-insights/shared/util-date-time';
import { Co2Http } from '../http/co2-http.service';
import {
  CO2EmissionsRecord,
  CO2EmissionsRecords,
} from '../http/co2-record.interface';

const twoDays = Duration.fromISO('P2D');
interface Co2State {
  // readonly interval: Interval;
  readonly records: readonly CO2EmissionsRecord[];
}

@Injectable()
export class Co2Store extends ComponentStore<Co2State> {
  records$: Observable<CO2EmissionsRecords> = this.select(
    state => state.records,
    {
      debounce: true,
    }
  );

  constructor(private co2http: Co2Http, danishDate: DanishDateStore) {
    super(initialState);
    // or
    // this.setState(initialState)

    // initialize the effect
    this.loadRecordsEveryMinute(danishDate.today$);
  }

  private loadRecordsEveryMinute = this.effect<DateTime>(danishToday$ =>
    combineLatest([danishToday$, timer(0, 60 * 1000)]).pipe(
      map(([danishToday]) =>
        Interval.fromDateTimes(danishToday, danishToday.plus(twoDays))
      ),
      switchMap(interval =>
        this.co2http.get(interval).pipe(
          tapResponse(
            records => this.updateRecords(records),
            // or using partial updater => no central updater as updateRecords
            // records => this.patchState({records}),

            () => this.updateRecords([])
          )
        )
      )
    )
  );

  private updateRecords = this.updater<CO2EmissionsRecords>(
    (state: Co2State, records): Co2State => {
      return { ...state, records };
    }
  );
}

const initialState: Co2State = {
  records: [],
};
