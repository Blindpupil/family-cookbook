import { defineStore } from "pinia";
import type { RecipeProperties } from "@/domain/recipe/types";

export const useRecipeStore = defineStore({
  id: "recipe",
  state: () => ({
    recipes: [] as RecipeProperties[],
  }),
  actions: {
    saveRecipes(recipes: RecipeProperties[]) {
      this.recipes = recipes;
    },
  },
});

export type RecipeStore = ReturnType<typeof useRecipeStore>;
