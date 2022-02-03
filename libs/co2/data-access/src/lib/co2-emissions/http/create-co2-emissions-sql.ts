import { DateQuery } from '../date-query';

export function createCo2EmissionsSql(dateQuery: DateQuery) {
  return `SELECT
  "Minutes5UTC" AS "minutes5UTC",
  "PriceArea" AS "priceArea",
  "CO2Emissions" AS "co2Emissions"
  FROM "co2emisprog"
  -- TODO WHERE Clause
  WHERE "Minutes5UTC" >= '${dateQuery.from.toISOString()}'
  AND "Minutes5UTC" < '${dateQuery.to.toISOString()}'
  ORDER BY "Minutes5UTC" ASC LIMIT 100;`;
}
