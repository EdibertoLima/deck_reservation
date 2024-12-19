<script setup lang="ts">
import { useAuthStore } from '../../../stores/auth';
import type { ReservationWithDeck } from '../../../types/reservation';
import { formatDate } from '../../../utils/date';

defineProps<{
  reservation: ReservationWithDeck;
}>();

const auth = useAuthStore();
</script>

<template>
  <div class="text-sm text-gray-600">
    <div class="flex items-center space-x-2">
      <span class="font-medium">Reserved by:</span>
      <span>{{ auth.getUserName(reservation.userId) }}</span>
    </div>
    <div class="flex items-center space-x-2">
      <span class="font-medium">Request made:</span>
      <span>{{ formatDate(reservation.requestDate) }}</span>
    </div>
  </div>
</template>