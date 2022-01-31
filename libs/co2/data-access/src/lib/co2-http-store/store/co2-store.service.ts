import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { Observable } from "rxjs";
import { CO2EmissionsRecord, CO2EmissionsRecords } from "../http/co2-record.interface";

export interface Co2State {
  readonly records: readonly CO2EmissionsRecord[]
}

@Injectable()
export class Co2Store extends ComponentStore<Co2State>{
  records$: Observable<CO2EmissionsRecords> = this.select(state => state.records);

  constructor() {
    super(initialState);

    // or
    // this.setState(initialState)
  }
}


const initialState: Co2State = {
  records: []
}
