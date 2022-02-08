import { Interval } from 'luxon';
import { createCo2EmissionsSql } from './create-co2-emissions-sql';

describe(createCo2EmissionsSql.name, () => {
  it('has a date range start filter', () => {
    const interval: Interval = Interval.fromISO(
      '2022-01-22T00:00:00+02:00/2022-01-24T00:00:00+02:00'
    );

    const sql = createCo2EmissionsSql(interval);

    expect(sql).toContain(`"Minutes5UTC" >= '${interval.start.toISO()}'`);
  });
  it('has a date range end filter', () => {
    const interval: Interval = Interval.fromISO(
      '2022-01-23T00:00:00+02:00/2022-01-25T00:00:00+02:00'
    );
    const sql = createCo2EmissionsSql(interval);

    expect(sql).toContain(`"Minutes5UTC" < '${interval.end.toISO()}'`);
  });
  it('sorts with newest record first', () => {
    const interval: Interval = Interval.fromISO(
      '2022-01-22T00:00:00+02:00/2022-01-24T00:00:00+02:00'
    );
    const sql = createCo2EmissionsSql(interval);

    expect(sql).toContain(`ORDER BY "Minutes5UTC" ASC`);
  });
  it('queries the co2 emis prog dataset', () => {
    const interval: Interval = Interval.fromISO(
      '2022-01-22T00:00:00+02:00/2022-01-24T00:00:00+02:00'
    );
    const sql = createCo2EmissionsSql(interval);
    const expectedTableName = 'co2emisprog';

    expect(sql).toContain(`FROM "${expectedTableName}"`);
  });
});
