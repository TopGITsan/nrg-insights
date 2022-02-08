import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { DateTime, Duration, Interval } from 'luxon';
import { combineLatest, map, Observable, switchMap, timer } from 'rxjs';
import { DanishDateStore } from '@nrg-insights/shared/util-date-time';
import { Co2Http } from '../http/co2-http.service';
import { Co2EmissionsResult } from '../http/co2-emissions-result-item.interface';
import { Co2Items } from '../domain/co2-items.interface';

const twoDays = Duration.fromISO('P2D');
interface Co2State {
  // readonly interval: Interval;
  readonly items: Co2Items;
}

@Injectable()
export class Co2Store extends ComponentStore<Co2State> {
  items$: Observable<Co2EmissionsResult> = this.select(state => state.items, {
    debounce: true,
  });

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
            result => this.updateItems(result),
            // or using partial updater => no central updater as updateRecords
            // records => this.patchState({records}),

            () => this.updateItems([])
          )
        )
      )
    )
  );

  private updateItems = this.updater<Co2EmissionsResult>(
    (state: Co2State, result): Co2State => {
      return { ...state, items: result };
    }
  );
}

const initialState: Co2State = {
  items: [],
};
