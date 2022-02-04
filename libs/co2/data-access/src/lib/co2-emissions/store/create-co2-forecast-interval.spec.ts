import { DateTime } from 'luxon';
import { createCo2ForecastInterval } from './create-co2-forecast-interval';
import { danishZone } from '../date-time-util/danish-zone';

describe(createCo2ForecastInterval.name, () => {
  it('returns the start of today as the date query from', () => {
    const fakeNow = DateTime.fromISO('2022-01-22T22:11:10+01:00');

    const actualInterval = createCo2ForecastInterval(fakeNow);

    expect(actualInterval.start).toEqual(
      DateTime.fromISO('2022-01-22T00:00:00+01:00', { zone: danishZone })
    );
  });
  it('the start of the day after tommorow is the endo of the forecast', () => {
    const fakeNow = DateTime.fromISO('2022-01-22T22:11:10+01:00');

    const actualInterval = createCo2ForecastInterval(fakeNow);

    expect(actualInterval.end).toEqual(
      DateTime.fromISO('2022-01-24T00:00:00+01:00', { zone: danishZone })
    );
  });
});
