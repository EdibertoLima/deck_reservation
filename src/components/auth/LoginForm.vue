<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../../stores/auth';
import { useRouter } from 'vue-router';

const auth = useAuthStore();
const router = useRouter();

const username = ref('');
const password = ref('');
const error = ref('');

const handleSubmit = async () => {
  error.value = '';
  
  if (!username.value || !password.value) {
    error.value = 'Please fill in all fields';
    return;
  }

  const success = await auth.login({
    username: username.value,
    password: password.value
  });

  if (success) {
    router.push('/');
  } else {
    error.value = 'Invalid credentials';
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-center mb-6">Login</h2>
      
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
          <input
            id="username"
            v-model="username"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div v-if="error" class="text-red-500 text-sm">
          {{ error }}
        </div>

        <button
          type="submit"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign in
        </button>
      </form>
    </div>
  </div>
</template>