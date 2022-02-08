import { DateTime } from 'luxon';

export interface Co2EmissionsResultItem {
  readonly minutes5UTC: DateTime;
  readonly priceArea: 'DK1' | 'DK2';
  readonly co2Emissions: number;
}

export type Co2EmissionsResult = readonly Co2EmissionsResultItem[];
