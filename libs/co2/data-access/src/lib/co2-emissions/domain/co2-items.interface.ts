import { DateTime } from 'luxon';

export interface Co2DataPoint {
  readonly minutes5UTC: DateTime;
  readonly priceArea: 'DK1' | 'DK2';
  readonly co2Emissions: number;
}

export type Co2Items = readonly Co2DataPoint[];

// todo : domain types should be in domain libraries
