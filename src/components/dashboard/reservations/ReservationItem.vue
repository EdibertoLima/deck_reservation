<script setup lang="ts">
import { computed } from 'vue';
import { formatDate } from '../../../utils/date';
import type { ReservationWithDeck } from '../../../types/reservation';
import StatusBadge from '../../common/StatusBadge.vue';
import ReservationUserInfo from './ReservationUserInfo.vue';

const props = defineProps<{
  reservation: ReservationWithDeck;
  showActions?: boolean;
}>();

const deckInfo = computed(() => ({
  name: props.reservation.deck?.name ?? 'Unknown Deck',
  description: props.reservation.deck?.description ?? 'No description available'
}));

const emit = defineEmits<{
  (e: 'approve'): void;
  (e: 'reject'): void;
}>();
</script>

<template>
  <div class="p-4 border rounded-lg">
    <div class="flex justify-between items-start">
      <div>
        <h3 class="font-semibold">{{ deckInfo.name }}</h3>
        <p class="text-sm text-gray-600">{{ deckInfo.description }}</p>
        <p class="text-sm text-gray-500 mt-1">
          Reserved for: {{ formatDate(reservation.reservationDate) }}
        </p>
        <ReservationUserInfo :reservation="reservation" class="mt-2" />
      </div>
      <div class="flex items-start space-x-3">
        <StatusBadge :status="reservation.status" />
        <div v-if="showActions && reservation.status === 'pending'" class="flex space-x-2">
          <button
            @click="emit('approve')"
            class="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
          >
            Approve
          </button>
          <button
            @click="emit('reject')"
            class="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  </div>
</template>