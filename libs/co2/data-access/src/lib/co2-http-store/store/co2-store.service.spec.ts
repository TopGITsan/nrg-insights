import { Co2Store } from "./co2-store.service";
import { TestBed } from "@angular/core/testing";
import { firstValueFrom } from "rxjs";

describe(Co2Store.name, () => {

  function setup() {
    TestBed.configureTestingModule({
      providers: [Co2Store]
    })
    const store = TestBed.inject(Co2Store);

    return {
      store
    }
  }


  it('is provided', () => {
    const { store } = setup();

    expect(store).not.toBeNull();
  })

  describe('records$', () => {
    it('initialy emits records', async () => {
      const { store } = setup();
      const result = await firstValueFrom(store.records$)

      expect(result).toEqual([]);
    })
  })
})
