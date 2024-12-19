<script setup lang="ts">
import { useAuthStore } from '../../stores/auth';
import { useRouter } from 'vue-router';

const auth = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  auth.logout();
  router.push('/login');
};
</script>

<template>
  <header class="bg-white shadow">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-900">Deck Reservation Dashboard</h1>
        <div class="flex items-center space-x-4">
          <span class="text-gray-600">{{ auth.currentUser?.username }}</span>
          <button
            @click="handleLogout"
            class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </header>
</template>