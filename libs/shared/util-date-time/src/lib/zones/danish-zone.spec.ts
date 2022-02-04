import { IANAZone } from 'luxon';
import { danishZone } from './danish-zone';

describe('danish-zone', () => {
  it('is valid', () => {
    const zone = danishZone;

    expect(zone.isValid).toBe(true);
  });
  it('is set to Europe Copenhagen', () => {
    const zone = danishZone.equals(IANAZone.create('Europe/Copenhagen'));

    expect(zone).toBe(true);
  });
});
