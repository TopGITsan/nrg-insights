import { trimSql } from './trim-sql';
describe(trimSql.name, () => {
  it('clears spaces and new lines from sql string', () => {
    const rawSql = `SELECT *
    FROM table;`;
    const trimmedSql = trimSql(rawSql);

    expect(trimmedSql).toBe('SELECT * FROM table;');
  });

  it('relpaces new line with space char', () => {
    const text = 'hello\nworld';

    const trimmedText = trimSql(text);

    expect(trimmedText).toBe('hello world');
  });
});
