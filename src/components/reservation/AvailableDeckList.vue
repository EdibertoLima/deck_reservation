<script setup lang="ts">
import type { DeckItem } from '../../types/deck';

defineProps<{
  decks: DeckItem[];
}>();

const emit = defineEmits<{
  (e: 'requestReservation', deckId: string): void;
}>();
</script>

<template>
  <div class="space-y-4">
    <div v-if="decks.length === 0" class="text-gray-500">
      No decks available for reservation
    </div>
    <div v-for="deck in decks" 
         :key="deck.id" 
         class="p-4 border rounded">
      <h3 class="font-semibold">{{ deck.name }}</h3>
      <p class="text-gray-600">{{ deck.description }}</p>
      <button
        @click="emit('requestReservation', deck.id)"
        class="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Request Reservation
      </button>
    </div>
  </div>
</template>