import { DateTime, Duration, Interval } from 'luxon';

export function createCo2ForecastDateQuery(now: DateTime): Interval {
  const localToday = now.startOf('day');
  const localDayAfterTomorrow = localToday.plus(Duration.fromISO('P2D'))

  return Interval.fromDateTimes(localToday,localDayAfterTomorrow);
}
