import { format, startOfDay } from 'date-fns';

export const formatDate = (date: Date): string => {
  return format(date, 'PPP');
};

export const normalizeDate = (date: Date): Date => {
  return startOfDay(date);
};