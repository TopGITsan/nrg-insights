import { Co2Store } from './co2-store.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { firstValueFrom, Observable, of, skip, take, throwError } from 'rxjs';
import { Co2Http } from '../http/co2-http.service';
import { CO2EmissionsRecords } from '../http/co2-record.interface';

describe(Co2Store.name, () => {
  function setup({ httpGetSpy = jest.fn().mockReturnValue(of([])) } : {
    readonly httpGetSpy?: jest.Mock<Observable<CO2EmissionsRecords>,[]>
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

  describe('records$', () => {
    it('initialy emits records', async () => {
      const { store } = setup();
      const result = await firstValueFrom(store.records$);

      expect(result).toEqual([]);
    });

    it('imediatly emits records on successfull response from the CO2 emissions API', async () => {
      // arrange
      const expectedRecords: CO2EmissionsRecords = [
        {
          co2Emissions: 99,
          minutes5UTC: new Date('2022-01-12T11:09:01+02:00'),
          priceArea: 'DK2',
        },
      ];
      const httpGetSpy = jest.fn().mockReturnValue(of(expectedRecords));

      const { store } = setup({httpGetSpy});
      // act
      const actualRecords = await firstValueFrom(
        store.records$.pipe(skip(1), take(1))
      );

      // assert
      expect(httpGetSpy).toHaveBeenCalledTimes(1);
      expect(actualRecords).toEqual(expectedRecords);
    });

    it('clears records on error response from the CO2 emissions API', async () => {
      // arrange
      const expectedRecords: CO2EmissionsRecords = [];

      const httpGetSpy = jest.fn().mockReturnValue(throwError(()=> new Error('CKAN Erro')))
      const { store } = setup({ httpGetSpy });
      // act
      const actualRecords = await firstValueFrom(
        store.records$.pipe(skip(1), take(1))
      );

      // assert
      expect(httpGetSpy).toHaveBeenCalledTimes(1);
      expect(actualRecords).toEqual(expectedRecords);
    });


  });
});
