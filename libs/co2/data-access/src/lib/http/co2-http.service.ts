import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

const url = 'https://www.energidataservice.dk/proxy/api/datastore_search_sql';

// sql param
// SELECT "Minutes5UTC", "MinutesSDK", "PriceArea", "CO2Emissions"
// FROM "co2emisprog" ORDERBY "Minutes5UTC" DESC LIMIT 100;

interface CO2EmissionsRecord {
  readonly minutes5UTC: Date;
  readonly priceArea: 'DK1' | 'DK2';
  readonly co2Emissions: number;
}

@Injectable({
  providedIn: 'root'
})
export class Co2Http {
  get(): Observable<readonly CO2EmissionsRecord[]> {
    return of([]);
  }
}
