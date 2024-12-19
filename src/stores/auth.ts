import { defineStore } from "pinia";
import type { AuthState, LoginCredentials } from "../types/auth";

// Mock user data - in a real app, this would come from a backend
const MOCK_USERS = [
  {
    id: "1",
    username: "admin",
    password: "123",
    role: "admin" as const,
  },
  {
    id: "2",
    username: "user",
    password: "123",
    role: "user" as const,
  },
];

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: null,
    isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
  }),

  getters: {
    currentUser: (state) => state.user,
    isAdmin: (state) => state.user?.role === "admin",
  },

  actions: {
    async login(credentials: LoginCredentials): Promise<boolean> {
      const user = MOCK_USERS.find(
        (u) =>
          u.username === credentials.username &&
          u.password === credentials.password
      );

      if (user) {
        const { password, ...userWithoutPassword } = user;
        this.user = userWithoutPassword;
        this.isAuthenticated = true;
        localStorage.setItem("isAuthenticated", "true");
        return true;
      }

      return false;
    },

    logout() {
      this.user = null;
      this.isAuthenticated = false;
      localStorage.removeItem("isAuthenticated");
    },

    getUserName(userId: string): string {
      const user = MOCK_USERS.find((u) => u.id === userId);
      return user?.username ?? "Unknown User";
    },
  },
});
