import { Interval } from 'luxon';

export function createCo2EmissionsSql(interval: Interval): string {
  return `SELECT
  "Minutes5UTC" AS "minutes5UTC",
  "PriceArea" AS "priceArea",
  "CO2Emissions" AS "co2Emissions"
  FROM "co2emisprog"
  -- TODO WHERE Clause
  WHERE "Minutes5UTC" >= '${interval.start.toISO()}'
  AND "Minutes5UTC" < '${interval.end.toISO()}'
  ORDER BY "Minutes5UTC" ASC LIMIT 100;`;
}
