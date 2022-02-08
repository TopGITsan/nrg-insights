export interface CkanResponseInterface<TRecord> {
  readonly help: string;
  readonly result: {
    readonly fields: [];
    readonly records: readonly TRecord[];
    readonly sql: string;
  };
  readonly success: true;
}
