import { Co2Http } from "./co2-http.service";
import { TestBed } from "@angular/core/testing";
import { firstValueFrom } from "rxjs";

describe(Co2Http.name, () => {

  beforeEach(() => {
    http = TestBed.inject(Co2Http);
  })

  let http: Co2Http;

  it('returns', async () => {
    const result = await firstValueFrom(http.get());
    expect(result).toEqual([]);
  })
})
