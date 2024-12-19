<script setup lang="ts">
import type { ReservationRequest } from '../../types/deck';
import { formatDate } from '../../utils/date';

const props = defineProps<{
  request: ReservationRequest;
  deckName: string;
}>();

const emit = defineEmits<{
  (e: 'approve'): void;
  (e: 'reject'): void;
}>();
</script>

<template>
  <div class="p-4 border rounded">
    <div class="flex justify-between items-start">
      <div>
        <h3 class="font-semibold">
          Deck: {{ deckName }}
        </h3>
        <p class="text-sm text-gray-600">
          Requested for: {{ formatDate(request.reservationDate) }}
        </p>
        <p class="text-sm text-gray-500">
          Request date: {{ formatDate(request.requestDate) }}
        </p>
      </div>
      <div class="space-x-2">
        <button
          @click="emit('approve')"
          class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Approve
        </button>
        <button
          @click="emit('reject')"
          class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Reject
        </button>
      </div>
    </div>
  </div>
</template>