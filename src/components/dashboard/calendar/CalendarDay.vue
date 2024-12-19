<script setup lang="ts">
import { computed } from 'vue';
import { format, isSameMonth } from 'date-fns';
import type { ReservationWithDeck } from '../../../types/reservation';

const props = defineProps<{
  date: Date;
  selected: boolean;
  reservations: ReservationWithDeck[];
}>();

const emit = defineEmits<{
  (e: 'select', date: Date): void;
}>();

const classes = computed(() => {
  return [
    'h-24 p-2 hover:bg-gray-50 flex flex-col',
    props.selected ? 'bg-blue-50' : 'bg-white',
    !isSameMonth(props.date, new Date()) && 'text-gray-400'
  ];
});
</script>

<template>
  <div
    :class="classes"
    @click="emit('select', date)"
  >
    <span class="text-sm">{{ format(date, 'd') }}</span>
    <div class="mt-1 flex-1 overflow-y-auto">
      <div
        v-for="reservation in reservations"
        :key="reservation.id"
        class="text-xs mb-1 p-1 rounded"
        :class="{
          'bg-yellow-100 text-yellow-800': reservation.status === 'pending',
          'bg-green-100 text-green-800': reservation.status === 'approved',
          'bg-red-100 text-red-800': reservation.status === 'rejected'
        }"
      >
        {{ reservation.deck.name }}
      </div>
    </div>
  </div>
</template>