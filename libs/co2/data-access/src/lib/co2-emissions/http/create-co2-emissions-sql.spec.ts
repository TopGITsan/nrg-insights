import { DateQuery } from '../date-query';
import { createCo2EmissionsSql } from './create-co2-emissions-sql';

describe(createCo2EmissionsSql.name, () => {
  it('has a date range start filter', () => {
    const dateQuery: DateQuery = {
      from: new Date('2022-01-22T00:00:00+02:00'),
      to: new Date('2022-01-24T00:00:00+02:00'),
    };
    const sql = createCo2EmissionsSql(dateQuery);

    expect(sql).toContain(`"Minutes5UTC" >= '${dateQuery.from.toISOString()}'`);
  });
  it('has a date range end filter', () => {
    const dateQuery: DateQuery = {
      from: new Date('2022-01-23T00:00:00+02:00'),
      to: new Date('2022-01-25T00:00:00+02:00'),
    };
    const sql = createCo2EmissionsSql(dateQuery);

    expect(sql).toContain(`"Minutes5UTC" < '${dateQuery.to.toISOString()}'`);
  });
  it('sorts with newest record first', () => {
    const dateQuery: DateQuery = {
      from: new Date('2022-01-23T00:00:00+02:00'),
      to: new Date('2022-01-25T00:00:00+02:00'),
    };
    const sql = createCo2EmissionsSql(dateQuery);

    expect(sql).toContain(`ORDER BY "Minutes5UTC" ASC`);
  });
  it('queries the co2 emis prog dataset', () => {
    const dateQuery: DateQuery = {
      from: new Date('2022-01-23T00:00:00+02:00'),
      to: new Date('2022-01-25T00:00:00+02:00'),
    };
    const sql = createCo2EmissionsSql(dateQuery);
    const expectedTableName = 'co2emisprog';

    expect(sql).toContain(`FROM "${expectedTableName}"`);
  });
});
