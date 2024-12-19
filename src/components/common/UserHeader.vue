<script setup lang="ts">
import { useAuthStore } from '../../stores/useAuthStore';
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
    <div class="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
      <div class="flex items-center space-x-4">
        <span class="font-medium">{{ auth.currentUser?.username }}</span>
        <span class="text-sm text-gray-500">({{ auth.currentUser?.role }})</span>
      </div>
      <button
        @click="handleLogout"
        class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
      >
        Logout
      </button>
    </div>
  </header>
</template>