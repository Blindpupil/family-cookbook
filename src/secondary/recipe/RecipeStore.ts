import { defineStore } from "pinia";
import type { RecipeId, RecipeProperties } from "@/domain/recipe/types";

export const useRecipeStore = defineStore({
  id: "recipe",
  state: () => ({
    recipes: [] as RecipeProperties[],
  }),
  actions: {
    saveRecipes(recipes: RecipeProperties[]) {
      this.recipes = recipes;
    },
    addRecipe(recipe: RecipeProperties) {
      this.recipes.push(recipe);
    },
    updateRecipe(recipe: RecipeProperties) {
      const index = this.recipes.findIndex((r) => r.id === recipe.id);
      this.recipes[index] = recipe;
    },
    removeRecipe(recipeId: RecipeId) {
      this.recipes = this.recipes.filter((recipe) => recipe.id !== recipeId);
    },
  },
});

export type RecipeStore = ReturnType<typeof useRecipeStore>;
