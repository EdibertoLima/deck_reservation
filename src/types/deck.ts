export type ReservationStatus = 'available' | 'pending' | 'approved' | 'rejected';

export interface DeckItem {
  id: string;
  name: string;
  description: string;
  reservedDate: Date | null;
  status: ReservationStatus;
  requestedBy?: string;
}

export interface ReservationRequest {
  id: string;
  deckId: string;
  userId: string;
  requestDate: Date;
  reservationDate: Date;
  status: ReservationStatus;
}