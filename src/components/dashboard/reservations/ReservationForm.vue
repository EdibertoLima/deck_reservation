<script setup lang="ts">
import { ref, computed } from "vue";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
} from "date-fns";
import { useReservationStore } from "../../../stores/reservation";

const emit = defineEmits<{
  (e: "close"): void;
  (e: "submit", date: Date): void;
}>();

const store = useReservationStore();
const currentDate = ref(new Date());
const selectedDay = ref<Date | null>(null);

const monthDays = computed(() => {
  const start = startOfMonth(currentDate.value);
  const end = endOfMonth(currentDate.value);
  return eachDayOfInterval({ start, end });
});

const nextMonth = () => {
  currentDate.value = addMonths(currentDate.value, 1);
  selectedDay.value = null;
};

const previousMonth = () => {
  currentDate.value = subMonths(currentDate.value, 1);
  selectedDay.value = null;
};

const selectDay = (day: Date) => {
  selectedDay.value = day;
  store.setSelectedDay(day);
};

const handleSubmit = () => {
  if (selectedDay.value) {
    emit("submit", selectedDay.value);
    emit("close");
  }
};

const isToday = (day: Date) => {
  const today = new Date();
  return format(day, "yyyy-MM-dd") === format(today, "yyyy-MM-dd");
};

const isPastDay = (day: Date) => {
  const today = new Date();
  return day < today;
};
</script>

<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
  >
    <div class="bg-white rounded-lg p-6 max-w-md w-full">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold">New Reservation</h3>
        <button
          @click="emit('close')"
          class="text-gray-500 hover:text-gray-700"
        >
          <span class="sr-only">Close</span>
          <svg
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div class="mb-4">
        <div class="flex justify-between items-center mb-4">
          <button
            @click="previousMonth"
            class="p-2 hover:bg-gray-100 rounded-full"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <span class="text-lg font-medium">{{
            format(currentDate, "MMMM yyyy")
          }}</span>
          <button @click="nextMonth" class="p-2 hover:bg-gray-100 rounded-full">
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        <div class="grid grid-cols-7 gap-1">
          <div
            v-for="day in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']"
            :key="day"
            class="text-center text-sm font-medium text-gray-700 py-1"
          >
            {{ day }}
          </div>
          <button
            v-for="day in monthDays"
            :key="day.toISOString()"
            :disabled="isPastDay(day)"
            @click="selectDay(day)"
            class="p-2 rounded-full text-sm"
            :class="{
              'bg-blue-500 text-white':
                selectedDay &&
                format(selectedDay, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd'),
              'hover:bg-gray-100': !isPastDay(day),
              'text-gray-400 cursor-not-allowed': isPastDay(day),
              'ring-2 ring-blue-200': isToday(day),
            }"
          >
            {{ format(day, "d") }}
          </button>
        </div>
      </div>

      <div class="flex justify-end space-x-3">
        <button
          type="button"
          @click="emit('close')"
          class="px-4 py-2 text-gray-700 hover:text-gray-900"
        >
          Cancel
        </button>
        <button
          type="button"
          @click="handleSubmit"
          :disabled="!selectedDay"
          class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Confirm Reservation
        </button>
      </div>
    </div>
  </div>
</template>
