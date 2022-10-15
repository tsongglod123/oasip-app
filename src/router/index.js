import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory("/kp3/"),
  routes: [
    {
      path: "/:catchNotMatchPath(.*)",
      name: "notfound",
      component: () => import("@/views/NotFound.vue"),
    },
    {
      path: "/",
      name: "home",
      component: () => import("@/views/HomeView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/LoginView.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/views/RegisterView.vue"),
    },
    {
      path: "/users",
      name: "users",
      component: () => import("@/views/UsersView.vue"),
    },
    {
      path: "/events",
      name: "events",
      component: () => import("@/views/EventsView.vue"),
    },
    {
      path: "/categories",
      name: "categories",
      component: () => import("@/views/CategoriesView.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: () => import("@/views/AboutView.vue"),
    },
  ],
});

export default router;
