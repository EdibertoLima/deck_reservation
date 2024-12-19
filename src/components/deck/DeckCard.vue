<script setup lang="ts">
import type { DeckItem } from '../../types/deck';
import { formatDate } from '../../utils/date';
import StatusBadge from '../common/StatusBadge.vue';

defineProps<{
  deck: DeckItem;
}>();
</script>

<template>
  <div class="p-4 border rounded">
    <div class="flex justify-between items-start">
      <div>
        <h3 class="font-semibold">{{ deck.name }}</h3>
        <p class="text-gray-600">{{ deck.description }}</p>
      </div>
      <StatusBadge :status="deck.status" />
    </div>
    
    <div v-if="deck.reservedDate" class="mt-2 text-sm text-gray-500">
      Reserved for: {{ formatDate(deck.reservedDate) }}
    </div>
  </div>
</template>