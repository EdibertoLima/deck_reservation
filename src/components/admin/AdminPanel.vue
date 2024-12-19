<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useReservationStore } from '../../stores/reservation';
import RequestCard from './RequestCard.vue';

const store = useReservationStore();
const { pendingRequests } = storeToRefs(store);
</script>

<template>
  <div class="bg-white p-6 rounded-lg shadow">
    <h2 class="text-xl font-semibold mb-4">Admin Panel - Pending Requests</h2>
    <div class="space-y-4">
      <div v-if="pendingRequests.length === 0" class="text-gray-500">
        No pending requests
      </div>
      <RequestCard
        v-for="request in pendingRequests"
        :key="request.id"
        :request="request"
        :deck-name="store.deckItems.find(d => d.id === request.deckId)?.name ?? ''"
        @approve="store.approveRequest(request.id)"
        @reject="store.rejectRequest(request.id)"
      />
    </div>
  </div>
</template>