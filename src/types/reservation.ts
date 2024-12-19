import type { DeckItem, ReservationStatus } from './deck';

export interface ReservationWithDeck {
  id: string;
  deckId: string;
  userId: string;
  requestDate: Date;
  reservationDate: Date;
  status: ReservationStatus;
  deck: DeckItem;
}