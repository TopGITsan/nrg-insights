import { danishZone } from './danish-zone';

describe('danish zone', () => {
  it('is a valid zone', () => {
    expect(danishZone.isValid).toBe(true);
  });
  it('is set to Europe Copenhagen', () => {
    expect(danishZone.name).toBe('Europe/Copenhagen');
  });
});
