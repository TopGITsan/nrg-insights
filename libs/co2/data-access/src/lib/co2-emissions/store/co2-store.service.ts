import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { DateTime, Duration, Interval } from 'luxon';
import { combineLatest, Observable, switchMap, timer } from 'rxjs';
import { danishZone } from '../date-time-util/danish-zone';
import { Co2Http } from '../http/co2-http.service';
import {
  CO2EmissionsRecord,
  CO2EmissionsRecords,
} from '../http/co2-record.interface';

const twoDays = Duration.fromISO('P2D');
interface Co2State {
  readonly danishToday: DateTime;
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
  private danishToday$: Observable<DateTime> = this.select(
    state => state.danishToday
  );
  // private interval$: Observable<Interval> = this.select(
  //   state => state.interval
  // );

  constructor(private co2http: Co2Http) {
    super(createInitialState(DateTime.now()));

    // or
    // this.setState(initialState)
    // initialize the effect
    this.loadRecordsEveryMinute(this.danishToday$);
  }

  private loadRecordsEveryMinute = this.effect<DateTime>(danishToday$ =>
    combineLatest([danishToday$, timer(0, 60 * 1000)]).pipe(
      switchMap(([day]) =>
        this.co2http.get(Interval.fromDateTimes(day, day.plus(twoDays))).pipe(
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

function createInitialState(localNow: DateTime): Co2State {
  return {
    danishToday: localNow.setZone(danishZone).startOf('day'),
    records: [],
  };
}
