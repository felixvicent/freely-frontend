import dayjs from 'dayjs';

export function isInDanger(date: string) {
  return dayjs(date).isBefore(dayjs());
}
