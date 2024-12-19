<script setup lang="ts">
import { ref, computed } from 'vue';
import { DeckItem } from '../types/deck';
import { format } from 'date-fns';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const selectedDate = ref<Date>(new Date());
const deckItems = ref<DeckItem[]>([
  {
    id: '1',
    name: 'Standard Deck',
    description: 'Regular 52-card deck',
    reservedDate: null,
    status: 'available'
  }
]);

const reserveDeck = (deck: DeckItem) => {
  if (!selectedDate.value) return;
  
  deck.reservedDate = selectedDate.value;
  deck.status = 'reserved';
};

const cancelReservation = (deck: DeckItem) => {
  deck.reservedDate = null;
  deck.status = 'available';
};

const availableDecks = computed(() => 
  deckItems.value.filter(deck => deck.status === 'available')
);

const reservedDecks = computed(() => 
  deckItems.value.filter(deck => deck.status === 'reserved')
);
</script>

<template>
  <div class="max-w-4xl mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6">Deck Reservation System</h1>
    
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-4">Select Date</h2>
      <VueDatePicker
        v-model="selectedDate"
        :min-date="new Date()"
        auto-apply
        class="mb-4"
      />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4">Available Decks</h2>
        <div v-for="deck in availableDecks" :key="deck.id" class="mb-4 p-4 border rounded">
          <h3 class="font-semibold">{{ deck.name }}</h3>
          <p class="text-gray-600">{{ deck.description }}</p>
          <button
            @click="reserveDeck(deck)"
            class="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Reserve
          </button>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4">Reserved Decks</h2>
        <div v-for="deck in reservedDecks" :key="deck.id" class="mb-4 p-4 border rounded">
          <h3 class="font-semibold">{{ deck.name }}</h3>
          <p class="text-gray-600">{{ deck.description }}</p>
          <p class="text-sm text-gray-500">
            Reserved for: {{ format(deck.reservedDate!, 'PPP') }}
          </p>
          <button
            @click="cancelReservation(deck)"
            class="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Cancel Reservation
          </button>
        </div>
      </div>
    </div>
  </div>
</template>