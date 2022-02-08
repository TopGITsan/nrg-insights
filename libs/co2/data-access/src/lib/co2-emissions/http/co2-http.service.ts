import { Injectable } from '@angular/core';
import { mergeMap, Observable, of, throwError } from 'rxjs';
import { CO2EmissionsRecord } from './co2-record.interface';
import { HttpClient } from '@angular/common/http';
import { CkanResponseInterface } from './ckan-response.interface';
import { CkanErrorResponseInterface } from './ckan-error-response.interface';
import { nrgDataServiceEndpoint } from './nrg-data-service-endpoint';
import { createCo2EmissionsSql } from './create-co2-emissions-sql';
import { trimSql } from './trim-sql';
import { DateTime, Interval } from 'luxon';
import { Co2EmissionsResult } from './co2-emissions-result-item.interface';

@Injectable({
  providedIn: 'root',
})
export class Co2Http {
  constructor(private http: HttpClient) {}
  get(interval: Interval): Observable<Co2EmissionsResult> {
    const sql = trimSql(createCo2EmissionsSql(interval));
    return this.http
      .get<
        CkanResponseInterface<CO2EmissionsRecord> | CkanErrorResponseInterface
      >(nrgDataServiceEndpoint, { params: { sql } })
      .pipe(
        mergeMap(response =>
          response.success
            ? of(
                response.result.records.map(v => ({
                  ...v,
                  minutes5UTC: DateTime.fromISO(v.minutes5UTC),
                }))
              )
            : throwError(() => new Error('CKAN Error'))
        )
      );
  }
}
