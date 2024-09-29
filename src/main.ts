import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./app-router";

// Services
import {
  recipeService,
  RecipeServiceKey,
} from "@/hexagon/services/recipeService";

// Setup
const app = createApp(App);
const pinia = createPinia();
app.use(pinia);

app.use(router);
app.provide(RecipeServiceKey, recipeService);

app.mount("#app");
