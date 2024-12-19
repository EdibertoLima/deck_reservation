<script setup lang="ts">
import { ref } from 'vue';
import MonthCalendar from './calendar/MonthCalendar.vue';
import ReservationList from './reservations/ReservationList.vue';
import DashboardHeader from './DashboardHeader.vue';
import { useReservationStore } from '../../stores/reservation';

const selectedDate = ref(new Date());
const store = useReservationStore();
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <DashboardHeader />
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2">
          <MonthCalendar
            v-model:selected-date="selectedDate"
            :reservations="store.allReservations"
          />
        </div>
        <div>
          <ReservationList :selected-date="selectedDate" />
        </div>
      </div>
    </div>
  </div>
</template>