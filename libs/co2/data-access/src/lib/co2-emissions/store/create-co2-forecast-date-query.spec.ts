import { createCo2ForecastDateQuery } from "./create-co2-forecast-date-query";

describe(createCo2ForecastDateQuery.name,()=>{
  it('returns the start of today as the date query from',()=>{
    const fakeNow = new Date('2022-01-22T22:11:10+01:00');

    const actualDateQuery = createCo2ForecastDateQuery(fakeNow);

    expect(actualDateQuery.from).toEqual(new Date('2022-01-22T00:00:00+01:00'))
  })
  it('the start of the day after tommorow is the endo of the forecast',()=>{
    const fakeNow = new Date('2022-01-22T22:11:10+01:00');

    const actualDateQuery = createCo2ForecastDateQuery(fakeNow);

    expect(actualDateQuery.to).toEqual(new Date('2022-01-24T00:00:00+01:00'))
  })
})
