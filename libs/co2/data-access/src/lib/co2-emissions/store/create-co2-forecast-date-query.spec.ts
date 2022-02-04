import { DateTime } from "luxon";
import { createCo2ForecastDateQuery } from "./create-co2-forecast-date-query";

describe(createCo2ForecastDateQuery.name,()=>{
  it('returns the start of today as the date query from',()=>{
    const fakeNow = DateTime.fromISO('2022-01-22T22:11:10+01:00');

    const actualInterval = createCo2ForecastDateQuery(fakeNow);

    expect(actualInterval.start).toEqual( DateTime.fromISO('2022-01-22T00:00:00+01:00'))
  })
  it('the start of the day after tommorow is the endo of the forecast',()=>{
    const fakeNow = DateTime.fromISO('2022-01-22T22:11:10+01:00');

    const actualInterval = createCo2ForecastDateQuery(fakeNow);

    expect(actualInterval.end).toEqual( DateTime.fromISO('2022-01-24T00:00:00+01:00'))
  })
})
