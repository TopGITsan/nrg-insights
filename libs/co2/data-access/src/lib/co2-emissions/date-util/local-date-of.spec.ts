import { localDateOf } from './local-date-of';

describe(localDateOf.name, () => {
  it('clear the hours', () => {
    const fakeNow = new Date('2022-01-21T11:23:11+02:00');

    const localDate = localDateOf(fakeNow);

    expect(localDate.getHours()).toBe(0);
  });
  it('clear the minutes', () => {
    const fakeNow = new Date('2022-01-21T11:20:11+02:00');

    const localDate = localDateOf(fakeNow);

    expect(localDate.getMinutes()).toBe(0);
  });
  it('clear the seconds', () => {
    const fakeNow = new Date('2022-01-21T11:20:41+02:00');

    const localDate = localDateOf(fakeNow);

    expect(localDate.getSeconds()).toBe(0);
  });
  it('clear the milliseconds', () => {
    const fakeNow = new Date('2022-01-21T11:20:11.123+02:00');

    const localDate = localDateOf(fakeNow);

    expect(localDate.getMilliseconds()).toBe(0);
  });

  it('does not mutate the passed Date instance', () => {
    const fakeNow = new Date('2022-01-21T11:20:11.123+02:00');
    const fakeNowTicks = fakeNow.valueOf();
    localDateOf(fakeNow);
    const actualTicks = fakeNow.valueOf();

    expect(actualTicks).toBe(fakeNowTicks);
  });
});
