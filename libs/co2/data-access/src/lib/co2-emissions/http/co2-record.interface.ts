export interface CO2EmissionsRecord {
  readonly minutes5UTC: Date;
  readonly priceArea: 'DK1' | 'DK2';
  readonly co2Emissions: number;
}


export type CO2EmissionsRecords = readonly CO2EmissionsRecord[];
