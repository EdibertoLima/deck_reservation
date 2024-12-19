<script setup lang="ts">
import { ref } from 'vue';
import { useReservationStore } from '../../stores/useReservationStore';
import DateSelector from './DateSelector.vue';
import AvailableDeckList from './AvailableDeckList.vue';

const selectedDate = ref<Date>(new Date());
const store = useReservationStore();

const requestReservation = (deckId: string) => {
  if (!selectedDate.value) return;
  store.createReservationRequest(deckId, selectedDate.value);
};
</script>

<template>
  <div class="mb-8">
    <h2 class="text-xl font-semibold mb-4">Select Reservation Date</h2>
    <DateSelector v-model:date="selectedDate" />
    <AvailableDeckList 
      :decks="store.deckItems.value.filter(d => d.status === 'available')"
      @request-reservation="requestReservation"
    />
  </div>
</template>