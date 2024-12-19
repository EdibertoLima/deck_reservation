<script setup lang="ts">
import { computed } from 'vue';
import { format, addMonths, subMonths } from 'date-fns';

const props = defineProps<{
  selectedDate: Date;
}>();

const emit = defineEmits<{
  (e: 'update:selectedDate', date: Date): void;
}>();

const formattedMonth = computed(() => format(props.selectedDate, 'MMMM yyyy'));

const nextMonth = () => {
  emit('update:selectedDate', addMonths(props.selectedDate, 1));
};

const previousMonth = () => {
  emit('update:selectedDate', subMonths(props.selectedDate, 1));
};
</script>

<template>
  <div class="flex items-center space-x-4">
    <label class="block text-sm font-medium text-gray-700">Select Month</label>
    <div class="flex items-center space-x-2 flex-1">
      <button
        type="button"
        @click="previousMonth"
        class="p-1 hover:bg-gray-100 rounded"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <span class="text-sm font-medium">{{ formattedMonth }}</span>
      <button
        type="button"
        @click="nextMonth"
        class="p-1 hover:bg-gray-100 rounded"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
</template>