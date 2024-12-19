import { defineStore } from "pinia";
import type { DeckItem, ReservationRequest } from "../types/deck";
import type { ReservationWithDeck } from "../types/reservation";
import { normalizeDate } from "../utils/date";

interface ReservationState {
  deckItems: DeckItem[];
  reservationRequests: ReservationRequest[];
  selectedDay: Date | null;
}

export const useReservationStore = defineStore("reservation", {
  state: (): ReservationState => ({
    deckItems: [
      {
        id: "1",
        name: "Standard Deck",
        description: "Regular 52-card deck",
        reservedDate: null,
        status: "available",
      },
    ],
    reservationRequests: [],
    selectedDay: null,
  }),

  getters: {
    availableDecks: (state) =>
      state.deckItems.filter((deck) => deck.status === "available"),
    pendingRequests: (state): ReservationWithDeck[] =>
      state.reservationRequests
        .filter((req) => req.status === "pending")
        .map((req) => ({
          ...req,
          deck: state.deckItems.find((d) => d.id === req.deckId)!,
        })),

    allReservations: (state): ReservationWithDeck[] =>
      state.reservationRequests.map((req) => ({
        ...req,
        deck: state.deckItems.find((d) => d.id === req.deckId)!,
      })),
  },

  actions: {
    setSelectedDay(value: Date | null) {
      this.selectedDay = value;
    },
    createReservationRequest(deckId: string, reservationDate: Date) {
      const requestId = `req-${Date.now()}`;
      const request: ReservationRequest = {
        id: requestId,
        deckId,
        userId: "1", // Using admin user ID for testing
        requestDate: normalizeDate(new Date()),
        reservationDate: normalizeDate(reservationDate),
        status: "pending",
      };

      this.reservationRequests.push(request);

      // const deck = this.deckItems.find((d) => d.id === deckId);
      // if (deck) {
      //   deck.status = "pending";
      //   deck.reservedDate = request.reservationDate;
      // }
    },

    approveRequest(requestId: string) {
      const request = this.reservationRequests.find((r) => r.id === requestId);
      if (request) {
        request.status = "approved";
        const deck = this.deckItems.find((d) => d.id === request.deckId);
        if (deck) {
          deck.status = "approved";
        }
      }
    },

    rejectRequest(requestId: string) {
      const request = this.reservationRequests.find((r) => r.id === requestId);
      if (request) {
        request.status = "rejected";
        const deck = this.deckItems.find((d) => d.id === request.deckId);
        if (deck) {
          deck.status = "available";
          deck.reservedDate = null;
        }
      }
    },
  },
});
