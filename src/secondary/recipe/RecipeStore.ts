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

const definedStore = useRecipeStore();
export type RecipeStore = typeof definedStore;
