import { format } from 'date-fns';
import { DATE_FORMAT } from '@/config';

export const todayDate = () => {
  const today: Date = new Date();
  return format(today, DATE_FORMAT);
};
