import dayjs from 'dayjs';

export function isInAlert(date: string) {
  return dayjs(date).subtract(3, 'days').isBefore(dayjs());
}
