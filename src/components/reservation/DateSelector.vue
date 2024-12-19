<script setup lang="ts">
import { ref } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { normalizeDate } from '../../utils/date';

const selectedDate = ref<Date>(normalizeDate(new Date()));

const emit = defineEmits<{
  (e: 'update:date', date: Date): void;
}>();

const updateDate = (date: Date) => {
  const normalizedDate = normalizeDate(date);
  selectedDate.value = normalizedDate;
  emit('update:date', normalizedDate);
};
</script>

<template>
  <div class="mb-4">
    <VueDatePicker
      v-model="selectedDate"
      :min-date="new Date()"
      :enable-time-picker="false"
      auto-apply
      @update:model-value="updateDate"
    />
  </div>
</template>