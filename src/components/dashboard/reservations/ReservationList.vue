<script setup lang="ts">
import { computed, ref } from "vue";
import { isSameDay } from "date-fns";
import { useReservationStore } from "../../../stores/reservation";
import { useAuthStore } from "../../../stores/auth";
import { validateReservationDate } from "../../../utils/validation";
import ReservationItem from "./ReservationItem.vue";
import ReservationForm from "./ReservationForm.vue";

const props = defineProps<{
  selectedDate: Date;
}>();

const store = useReservationStore();
const auth = useAuthStore();
const showReservationForm = ref(false);

const reservationsForDay = computed(() => {
  return store.allReservations.filter((res) =>
    isSameDay(res.reservationDate, props.selectedDate)
  );
});

const pendingReservations = computed(() => {
  return store.pendingRequests;
});

const handleReservationSubmit = (date: Date) => {
  const validation = validateReservationDate(date, store.allReservations);

  if (!validation.valid) {
    alert(validation.message);
    return;
  }

  const availableDeck = store.availableDecks[0];

  if (availableDeck) {
    store.createReservationRequest(availableDeck.id, date);
    showReservationForm.value = false;
  } else {
    alert("No decks available for reservation");
  }
};
</script>

<template>
  <div class="space-y-6">
    <!-- Daily Reservations -->
    <div class="bg-white rounded-lg shadow">
      <div class="p-4 border-b flex justify-between items-center">
        <h2 class="text-lg font-semibold">Reservations</h2>
        <button
          @click="showReservationForm = true"
          v-if="!reservationsForDay[0]?.id"
          :class="[
            'px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600',
          ]"
        >
          New Reservation
        </button>
      </div>
      <div class="p-4">
        <div
          v-if="reservationsForDay.length === 0"
          class="text-gray-500 text-center"
        >
          No reservations for this day
        </div>
        <div class="space-y-4">
          <ReservationItem
            v-for="reservation in reservationsForDay"
            :key="reservation.id"
            :reservation="reservation"
          />
        </div>
      </div>
    </div>

    <!-- Admin Section -->
    <div v-if="auth.isAdmin" class="bg-white rounded-lg shadow">
      <div class="p-4 border-b">
        <h2 class="text-lg font-semibold">Pending Approvals</h2>
      </div>
      <div class="p-4">
        <div
          v-if="pendingReservations.length === 0"
          class="text-gray-500 text-center"
        >
          No pending approvals
        </div>
        <div class="space-y-4">
          <ReservationItem
            v-for="reservation in pendingReservations"
            :key="reservation.id"
            :reservation="reservation"
            :show-actions="true"
            @approve="store.approveRequest(reservation.id)"
            @reject="store.rejectRequest(reservation.id)"
          />
        </div>
      </div>
    </div>

    <!-- Reservation Form Modal -->
    <ReservationForm
      v-if="showReservationForm"
      @close="showReservationForm = false"
      @submit="handleReservationSubmit"
    />
  </div>
</template>
