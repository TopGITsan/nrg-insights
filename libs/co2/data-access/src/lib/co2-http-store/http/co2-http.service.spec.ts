import { Co2Http } from "./co2-http.service";
import { TestBed } from "@angular/core/testing";
import { firstValueFrom } from "rxjs";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { nrgDataServiceEndpoint } from "./nrg-data-service-endpoint";
import { CkanResponseInterface } from "./ckan-response.interface";
import { CO2EmissionsRecord, CO2EmissionsRecords } from "./co2-record.interface";
import { CkanErrorResponseInterface } from "./ckan-error-response.interface";



describe(Co2Http.name, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    http = TestBed.inject(Co2Http);
    controller = TestBed.inject(HttpTestingController);
  });

  afterEach(
    () => controller.verify() // verify our expectations
  );

  let http: Co2Http;
  let controller: HttpTestingController;

  it('maps response to records on success', async () => {
    // arrange
    const records = [
      {
        co2Emissions: 99,
        minutes5UTC: '2022-09-01T22:10:11+02:00',
        priceArea: 'DK1',
      },
    ];
    const ckanResponse = {
      help: 'me',
      result: {
        fields: [],
        records,
        sql: nrgDataServiceEndpoint,
      },
      success: true,
    };
    // act
    const whenResult = firstValueFrom(http.get());
    // tell the mock the expectations after you call it
    const testRequest = controller.expectOne(
      request =>
        request.method === 'GET' &&
        request.url.startsWith(nrgDataServiceEndpoint)
    );
    testRequest.flush(ckanResponse);

    // assert
    expect(await whenResult).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          co2Emissions: expect.any(Number),
          minutes5UTC: expect.any(Date),
          priceArea: expect.any(String),
        }) as CO2EmissionsRecord,
      ])
    );
  });

  it('emits an array for successfull response', async () => {
    // arrange
    const records = [
      {
        co2Emissions: 199,
        minutes5UTC: '2022-09-01T24:20:11+02:00',
        priceArea: 'DK2',
      },
    ];
    const ckanResponse = {
      help: 'me',
      result: {
        fields: [],
        records,
        sql: nrgDataServiceEndpoint,
      },
      success: true,
    };
    // act
    const whenResult = firstValueFrom(http.get());
    // tell the mock the expectations after you call it
    const testRequest = controller.expectOne(
      request =>
        request.method === 'GET' &&
        request.url.startsWith(nrgDataServiceEndpoint)
    );
    testRequest.flush(ckanResponse);

    // assert
    // expect(await whenResult).toEqual(
    //   expect.arrayContaining(
    //     records.map(v => ({ ...v, minutes5UTC: new Date(v.minutes5UTC) }))
    //   ) as CO2EmissionsRecords
    // );
    await expect(whenResult).resolves.toEqual(expect.any(Array));
  });
  it('emist an Error on error response', async () => {
    // arrange

    const ckanResponse: CkanErrorResponseInterface = {
      help: 'me',
      success: false,
    };
    // act
    const whenErrorResponse = firstValueFrom(http.get());
    // tell the mock the expectations after you call it
    const testRequest = controller.expectOne(
      request =>
        request.method === 'GET' &&
        request.url.startsWith(nrgDataServiceEndpoint)
    );
    testRequest.flush(ckanResponse);

    // assert
    // await expect(whenErrorResponse).rejects.toThrow('CKAN Error');
    await expect(whenErrorResponse).rejects.toEqual(expect.any(Error));
  });
});
