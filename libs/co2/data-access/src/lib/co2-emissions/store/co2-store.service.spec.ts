import { Co2Store } from './co2-store.service';
import {
  discardPeriodicTasks,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  firstValueFrom,
  Observable,
  of,
  range,
  skip,
  take,
  throwError,
} from 'rxjs';
import { Co2Http } from '../http/co2-http.service';
import { DateTime, Interval } from 'luxon';
import { Co2EmissionsResult } from '../http/co2-emissions-result-item.interface';

describe(Co2Store.name, () => {
  function setup({
    httpGetSpy = jest.fn().mockReturnValue(of([])),
  }: {
    readonly httpGetSpy?: jest.Mock<Observable<Co2EmissionsResult>, [Interval]>;
  } = {}) {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Co2Store],
    });
    // put an spy on the 'get' method before the store is created and mock it's return value
    const http = TestBed.inject(Co2Http);
    http.get = httpGetSpy;
    // const httpGetSpy = jest.spyOn(http, 'get').mockReturnValue(of(records));
    const store = TestBed.inject(Co2Store);

    return {
      store,
    };
  }

  it('is provided', () => {
    const { store } = setup();

    expect(store).not.toBeNull();
  });

  describe('items$', () => {
    it('initialy emits 0 items', async () => {
      const { store } = setup();
      const items = await firstValueFrom(store.items$);

      expect(items).toEqual([]);
    });

    it('imediatly emits records on successfull response from the CO2 emissions API', async () => {
      // arrange
      const result: Co2EmissionsResult = [
        {
          co2Emissions: 99,
          minutes5UTC: DateTime.fromISO('2022-01-12T11:09:01+02:00'),
          priceArea: 'DK2',
        },
      ];
      const expectedItems = result;
      const httpGetSpy = jest.fn().mockReturnValue(of(result));

      const { store } = setup({ httpGetSpy });
      // act
      const actualItems = await firstValueFrom(
        store.items$.pipe(skip(1), take(1))
      );

      // assert
      expect(httpGetSpy).toHaveBeenCalledTimes(1);
      expect(actualItems).toEqual(expectedItems);
    });

    it('clears records on error response from the CO2 emissions API', async () => {
      // arrange
      const expectedItems: Co2EmissionsResult = [];

      const httpGetSpy = jest
        .fn()
        .mockReturnValue(throwError(() => new Error('CKAN Erro')));
      const { store } = setup({ httpGetSpy });
      // act
      const actualItems = await firstValueFrom(
        store.items$.pipe(skip(1), take(1))
      );

      // assert
      expect(httpGetSpy).toHaveBeenCalledTimes(1);
      expect(actualItems).toEqual(expectedItems);
    });

    it('it requests data every minute', fakeAsync(() => {
      // arrange
      const httpGetSpy = jest
        .fn<Observable<Co2EmissionsResult>, [Interval]>()
        .mockReturnValue(of([]));
      const oneMinuteMs = 60 * 1000;
      const oneHourMinutes = 60;
      const initialRequestCount = 1;
      setup({ httpGetSpy });

      // act
      // initial effect
      tick(0);

      range(initialRequestCount, oneHourMinutes).forEach(_ =>
        tick(oneMinuteMs)
      );

      // clean
      discardPeriodicTasks();

      // assert
      expect(httpGetSpy).toHaveBeenCalledTimes(
        initialRequestCount + oneHourMinutes
      );
    }));
  });
});
