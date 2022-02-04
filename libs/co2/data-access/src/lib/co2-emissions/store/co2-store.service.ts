import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { DateTime, Interval } from 'luxon';
import { combineLatest, Observable, switchMap, timer } from 'rxjs';
import { Co2Http } from '../http/co2-http.service';
import {
  CO2EmissionsRecord,
  CO2EmissionsRecords,
} from '../http/co2-record.interface';
import { createCo2ForecastDateQuery } from './create-co2-forecast-date-query';

interface Co2State {
  readonly interval: Interval;
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
  private interval$: Observable<Interval> = this.select(
    state => state.interval
  );

  constructor(private co2http: Co2Http) {
    super(createInitialState(DateTime.now()));

    // or
    // this.setState(initialState)
    // initialize the effect
    this.loadRecordsEveryMinute(this.interval$);
  }

  private loadRecordsEveryMinute = this.effect<Interval>(interval$ =>
    combineLatest([interval$, timer(0, 60 * 1000)]).pipe(
      switchMap(([interval]) =>
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
    (state: Co2State, records) => {
      return { ...state, records };
    }
  );
}

function createInitialState(now: DateTime): Co2State {
  return {
    interval: createCo2ForecastDateQuery(now),
    records: [],
  };
}
