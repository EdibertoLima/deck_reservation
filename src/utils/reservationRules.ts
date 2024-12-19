import { ReservationWithDeck } from '../types/reservation';
import { isSameDay } from 'date-fns';

export const isDateAvailable = (date: Date, reservations: ReservationWithDeck[]): boolean => {
  return !reservations.some(reservation => 
    isSameDay(reservation.reservationDate, date) && 
    ['pending', 'approved'].includes(reservation.status)
  );
};