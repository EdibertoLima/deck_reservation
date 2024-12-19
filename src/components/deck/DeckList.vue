<script setup lang="ts">
import { DeckItem } from '../../types/deck';
import DeckCard from './DeckCard.vue';

defineProps<{
  decks: DeckItem[];
  title: string;
}>();
</script>

<template>
  <div class="bg-white p-6 rounded-lg shadow">
    <h2 class="text-xl font-semibold mb-4">{{ title }}</h2>
    <div class="space-y-4">
      <DeckCard
        v-for="deck in decks"
        :key="deck.id"
        :deck="deck"
      />
    </div>
  </div>
</template>