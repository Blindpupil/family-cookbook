import { createRouter, createWebHistory } from "vue-router";
import App from "../hexagon/ui/RecipesPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "recipes",
      component: App,
    },
    {
      path: "/composition",
      name: "recipes_composition",
      component: () => import("@/classic/pages/RecipePage_composition.vue"),
    },
  ],
});

export default router;
