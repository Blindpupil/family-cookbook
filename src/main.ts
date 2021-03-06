import { createApp } from "vue";
import type { InjectionKey } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./app-router";

import { RecipeResource } from "@/secondary/recipe/RecipeResource";
import { RestClient } from "@/secondary/RestClient";
import { useRecipeStore } from "@/secondary/recipe/RecipeStore";
import { RecipeService } from "@/primary/recipe/use-cases";
import { UserResource } from "@/secondary/user/UserResource";

// Services
const pinia = createPinia();
const restClient = new RestClient();

const userResource = new UserResource();

const recipeStore = useRecipeStore();
const recipeResource = new RecipeResource(restClient, recipeStore);
const recipeService = new RecipeService(recipeResource, userResource);

// Setup
const app = createApp(App);

app.use(pinia);
app.use(router);
app.provide("recipeService", recipeService);

app.mount("#app");
