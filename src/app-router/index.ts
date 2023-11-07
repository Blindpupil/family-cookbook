import { createRouter, createWebHistory } from "vue-router";
import App from "../pages/RecipesPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "recipes",
      component: App,
    },
    {
      path: "/classic",
      name: "recipes_classic",
      component: () => import("../pages/RecipePage_classic.vue"),
    },
    {
      path: "/composition",
      name: "recipes_composition",
      component: () => import("../pages/RecipePage_composition.vue"),
    },
  ],
});

export default router;
