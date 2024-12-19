<script setup lang="ts">
import { computed } from 'vue';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths } from 'date-fns';
import type { ReservationWithDeck } from '../../../types/reservation';
import CalendarDay from './CalendarDay.vue';

const props = defineProps<{
  selectedDate: Date;
  reservations: ReservationWithDeck[];
}>();

const emit = defineEmits<{
  (e: 'update:selectedDate', date: Date): void;
}>();

const days = computed(() => {
  const start = startOfMonth(props.selectedDate);
  const end = endOfMonth(props.selectedDate);
  return eachDayOfInterval({ start, end });
});

const getReservationsForDay = (day: Date) => {
  return props.reservations.filter(res => isSameDay(res.reservationDate, day));
};

const nextMonth = () => {
  emit('update:selectedDate', addMonths(props.selectedDate, 1));
};

const previousMonth = () => {
  emit('update:selectedDate', subMonths(props.selectedDate, 1));
};
</script>

<template>
  <div class="bg-white rounded-lg shadow">
    <div class="p-4 border-b flex justify-between items-center">
      <button
        @click="previousMonth"
        class="p-2 hover:bg-gray-100 rounded-full"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <h2 class="text-lg font-semibold">
        {{ format(selectedDate, 'MMMM yyyy') }}
      </h2>
      <button
        @click="nextMonth"
        class="p-2 hover:bg-gray-100 rounded-full"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
    <div class="grid grid-cols-7 gap-px bg-gray-200">
      <div
        v-for="day in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']"
        :key="day"
        class="bg-gray-50 p-2 text-center text-xs font-medium text-gray-700"
      >
        {{ day }}
      </div>
      <CalendarDay
        v-for="day in days"
        :key="day.toISOString()"
        :date="day"
        :selected="isSameDay(day, selectedDate)"
        :reservations="getReservationsForDay(day)"
        @select="emit('update:selectedDate', day)"
      />
    </div>
  </div>
</template>