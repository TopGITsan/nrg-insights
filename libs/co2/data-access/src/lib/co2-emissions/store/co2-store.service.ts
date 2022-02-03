import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { combineLatest, Observable, switchMap, timer } from 'rxjs';
import { DateQuery } from '../date-query';
import { Co2Http } from '../http/co2-http.service';
import {
  CO2EmissionsRecord,
  CO2EmissionsRecords,
} from '../http/co2-record.interface';
import { createCo2ForecastDateQuery } from './create-co2-forecast-date-query';

interface Co2State {
  readonly dateQuery: DateQuery;
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
  private dateQuery$: Observable<DateQuery> = this.select(
    state => state.dateQuery
  );

  constructor(private co2http: Co2Http) {
    super(createInitialState(new Date()));

    // or
    // this.setState(initialState)
    // initialize the effect
    this.loadRecordsEveryMinute(this.dateQuery$);
  }

  private loadRecordsEveryMinute = this.effect<DateQuery>(dateQuery$ =>
    combineLatest([dateQuery$, timer(0, 60 * 1000)]).pipe(
      switchMap(([dateQuery]) =>
        this.co2http.get(dateQuery).pipe(
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

function createInitialState(now: Date): Co2State {
  return {
    dateQuery: createCo2ForecastDateQuery(now),
    records: [],
  };
}
