import { format } from 'date-fns';
import { DATE_FORMAT, DATE_FORMAT_EN } from '@/config';

export const todayDate = () => {
  const today: Date = new Date();
  return format(today, DATE_FORMAT);
};

export const formattedDate = (value: string, dateFormat = DATE_FORMAT_EN) => {
  const date = new Date(value);
  return format(date, dateFormat);
};
