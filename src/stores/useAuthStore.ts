import { computed, ref } from "vue";
import type { AuthState, LoginCredentials } from "../types/auth";

// Mock user data - in a real app, this would come from a backend
const MOCK_USERS = [
  {
    id: "1",
    username: "admin",
    password: "123",
    role: "admin" as const,
  },
];

export function useAuthStore() {
  const state = ref<AuthState>({
    user: null,
    isAuthenticated: false,
  });

  const isAuthenticated = computed(() => state.value.isAuthenticated);
  const currentUser = computed(() => state.value.user);
  const isAdmin = computed(() => state.value.user?.role === "admin");

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    const user = MOCK_USERS.find(
      (u) =>
        u.username === credentials.username &&
        u.password === credentials.password
    );

    if (user) {
      const { password, ...userWithoutPassword } = user;
      state.value.user = userWithoutPassword;
      localStorage.setItem("isAuthenticated", "true");
      return true;
    }

    return false;
  };

  const logout = () => {
    state.value.user = null;
    state.value.isAuthenticated = false;
    localStorage.removeItem("isAuthenticated");
  };

  console.log(state.value.isAuthenticated, "chamasxxx");

  return {
    isAuthenticated,
    currentUser,
    isAdmin,
    login,
    logout,
  };
}