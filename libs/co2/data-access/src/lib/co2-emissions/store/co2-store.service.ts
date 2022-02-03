import { Injectable } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { combineLatest, Observable, switchMap, timer } from "rxjs";
import { DateQuery } from "../date-query";
import { Co2Http } from "../http/co2-http.service";
import { CO2EmissionsRecord, CO2EmissionsRecords } from "../http/co2-record.interface";

interface Co2State {
  readonly records: readonly CO2EmissionsRecord[]
}


@Injectable()
export class Co2Store extends ComponentStore<Co2State>{
  records$: Observable<CO2EmissionsRecords> = this.select(state => state.records,{
    debounce: true
  });

  constructor(private co2http: Co2Http) {
    super(initialState);

    // or
    // this.setState(initialState)
    // initialize the effect
    this.loadRecordsEveryMinute({ from: new Date(), to: new Date() })
  }

  private loadRecordsEveryMinute = this.effect<DateQuery>(queryFilter$ =>
    combineLatest([queryFilter$, timer(0, 60 * 1000)]).pipe(
      switchMap(queryFilter => this.co2http.get().pipe(
        tapResponse(
          records => this.updateRecords(records),
          // or using partial updater => no central updater as updateRecords
          // records => this.patchState({records}),
          () => this.updateRecords([])
        )
      )),
    )
  )

  private updateRecords = this.updater<CO2EmissionsRecords>((state: Co2State, records) => {
    return ({ ...state, records })
  })
}


const initialState: Co2State = {
  records: []
}
