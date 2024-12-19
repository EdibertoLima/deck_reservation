import { ReservationWithDeck } from '../types/reservation';
import { isSameDay, isAfter, startOfDay } from 'date-fns';

export const validateReservationDate = (date: Date, reservations: ReservationWithDeck[]): { valid: boolean; message: string } => {
  const today = startOfDay(new Date());
  
  if (!isAfter(date, today)) {
    return {
      valid: false,
      message: 'Cannot make reservations for past dates'
    };
  }

  const existingReservation = reservations.find(reservation => 
    isSameDay(reservation.reservationDate, date) && 
    ['pending', 'approved'].includes(reservation.status)
  );

  if (existingReservation) {
    return {
      valid: false,
      message: 'This date already has a reservation'
    };
  }

  return {
    valid: true,
    message: ''
  };
};