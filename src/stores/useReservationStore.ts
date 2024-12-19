import { ref } from 'vue';
import type { DeckItem, ReservationRequest } from '../types/deck';
import { normalizeDate } from '../utils/date';

export function useReservationStore() {
  const deckItems = ref<DeckItem[]>([
    {
      id: '1',
      name: 'Standard Deck',
      description: 'Regular 52-card deck',
      reservedDate: null,
      status: 'available'
    }
  ]);

  const reservationRequests = ref<ReservationRequest[]>([]);

  const createReservationRequest = (deckId: string, reservationDate: Date) => {
    const requestId = `req-${Date.now()}`;
    const request: ReservationRequest = {
      id: requestId,
      deckId,
      userId: 'user-1', // In a real app, this would come from auth
      requestDate: normalizeDate(new Date()),
      reservationDate: normalizeDate(reservationDate),
      status: 'pending'
    };
    
    reservationRequests.value.push(request);
    
    const deck = deckItems.value.find(d => d.id === deckId);
    if (deck) {
      deck.status = 'pending';
      deck.reservedDate = request.reservationDate;
    }
  };

  const approveRequest = (requestId: string) => {
    const request = reservationRequests.value.find(r => r.id === requestId);
    if (request) {
      request.status = 'approved';
      const deck = deckItems.value.find(d => d.id === request.deckId);
      if (deck) {
        deck.status = 'approved';
      }
    }
  };

  const rejectRequest = (requestId: string) => {
    const request = reservationRequests.value.find(r => r.id === requestId);
    if (request) {
      request.status = 'rejected';
      const deck = deckItems.value.find(d => d.id === request.deckId);
      if (deck) {
        deck.status = 'available';
        deck.reservedDate = null;
      }
    }
  };

  const getPendingRequests = () => {
    return reservationRequests.value.filter(req => req.status === 'pending');
  };

  return {
    deckItems,
    reservationRequests,
    createReservationRequest,
    approveRequest,
    rejectRequest,
    getPendingRequests
  };
}