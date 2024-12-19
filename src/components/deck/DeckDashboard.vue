<script setup lang="ts">
import { computed } from 'vue';
import DeckList from './DeckList.vue';
import AdminPanel from '../admin/AdminPanel.vue';
import ReservationCalendar from '../reservation/ReservationCalendar.vue';
import { useReservationStore } from '../../stores/useReservationStore';
import { useAuthStore } from '../../stores/useAuthStore';
import UserHeader from '../common/UserHeader.vue';

const store = useReservationStore();
const auth = useAuthStore();

const availableDecks = computed(() => 
  store.deckItems.value.filter(deck => deck.status === 'available')
);

const pendingAndReservedDecks = computed(() => 
  store.deckItems.value.filter(deck => deck.status !== 'available')
);
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <UserHeader />
    <div class="p-4">
      <div class="max-w-6xl mx-auto space-y-6">
        <h1 class="text-3xl font-bold">Deck Reservation System</h1>
        
        <ReservationCalendar />
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DeckList
            title="Available Decks"
            :decks="availableDecks"
          />
          <DeckList
            title="Pending & Reserved Decks"
            :decks="pendingAndReservedDecks"
          />
        </div>
        
        <AdminPanel v-if="auth.isAdmin" />
      </div>
    </div>
  </div>
</template>