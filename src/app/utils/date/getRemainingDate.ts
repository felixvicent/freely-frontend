import dayjs from 'dayjs';

export function getRemainigDate(date: string) {
  const currentDate = dayjs();
  const targetDate = dayjs(date);

  const monthDiff = targetDate.diff(currentDate, 'month');

  if (monthDiff > 0) return `${monthDiff} mes${monthDiff > 1 ? 'es' : ''}`;

  const weekDiff = targetDate.diff(currentDate, 'week');

  if (weekDiff > 0) return `${weekDiff} semana${weekDiff > 1 ? 's' : ''}`;

  const daysDiff = targetDate.diff(currentDate, 'day');

  if (daysDiff > 0) return `${daysDiff} dia${daysDiff > 1 ? 's' : ''}`;

  if (currentDate.isAfter(targetDate)) return '';

  return 'Hoje';
}
