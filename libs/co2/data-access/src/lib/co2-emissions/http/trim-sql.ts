export function trimSql(sql: string): string {
  const reg = new RegExp(/\s*\n\s*/g);
  return sql.replace(reg, ' ');
}
