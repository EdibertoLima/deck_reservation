<script setup lang="ts">
import type { ReservationStatus } from '../../types/deck';

const props = defineProps<{
  status: ReservationStatus;
}>();

const getStatusClass = (status: ReservationStatus): string => {
  const baseClasses = 'px-2 py-1 rounded-full text-xs font-semibold';
  const statusClasses = {
    available: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-blue-100 text-blue-800',
    rejected: 'bg-red-100 text-red-800'
  };
  return `${baseClasses} ${statusClasses[status]}`;
};
</script>

<template>
  <span :class="getStatusClass(status)">
    {{ status }}
  </span>
</template>