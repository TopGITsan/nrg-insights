import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { CO2EmissionsRecord } from "../http/co2-record.interface";

export interface Co2State {
  readonly records:  readonly CO2EmissionsRecord[]
}

@Injectable()
export class Co2Store extends ComponentStore<Co2State>{
  constructor(){
    super(initialState);

    // or
    // this.setState(initialState)
  }
}

const initialState:Co2State = {
  records: []
}
