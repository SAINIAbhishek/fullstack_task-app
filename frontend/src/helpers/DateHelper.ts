import { format } from 'date-fns';
import { CONFIG } from '@/config/Config';

export const todayDate = () => {
  const today: Date = new Date();
  return format(today, CONFIG.DATE_FORMAT);
};

export const formattedDate = (
  value: string,
  dateFormat = CONFIG.DATE_FORMAT_EN,
) => {
  const date = new Date(value);
  return format(date, dateFormat);
};
