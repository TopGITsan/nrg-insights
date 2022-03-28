import { DateTime, Settings } from 'luxon';
import { TestBed } from '@angular/core/testing';
import { first, firstValueFrom } from 'rxjs';
import { DanishDateStore } from './danish-date.store';
import { danishZone } from './zones/danish-zone';

describe(DanishDateStore.name, () => {
  describe('today$', () => {
    it('emits the start of the current danish date', async () => {
      // arrange
      const _now = Settings.now;
      const fakeNow = DateTime.fromISO('2022-02-08T11:22:33', {
        zone: danishZone,
      });
      Settings.now = () => fakeNow.toMillis(); // or valueOf()
      const store = TestBed.inject(DanishDateStore);
      const expectedToday = DateTime.fromISO('2022-02-08T00:00:00', {
        zone: danishZone,
      });

      // act
      const actualToday = await firstValueFrom(store.today$.pipe(first()));

      // assert
      expect(actualToday).toEqual(expectedToday);

      // teardown; restore now ,so it doesn't affect other tests
      Settings.now = _now;
    });
  });
});
