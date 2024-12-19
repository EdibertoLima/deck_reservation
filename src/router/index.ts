import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("../components/auth/LoginForm.vue"),
      meta: { requiresAuth: false },
    },
    {
      path: "/",
      name: "dashboard",
      component: () => import("../components/dashboard/MonthlyDashboard.vue"),
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login");
  } else if (to.path === "/login" && isAuthenticated) {
    next("/");
  } else next();
});

export default router;