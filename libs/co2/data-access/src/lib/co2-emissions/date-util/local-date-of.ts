export function localDateOf(dateTime: Date): Date {
  const copy = new Date(dateTime);
  copy.setHours(0,0,0,0);
  return copy;
}
