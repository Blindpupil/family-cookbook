import { ref } from "vue";
import { defineStore } from "pinia";

import type { RecipeId, RecipeProperties } from "@/hexagon/domain/recipe/types";

export const useRecipeStore = defineStore("recipe", () => {
  const recipes = ref<RecipeProperties[]>([]);

  function saveRecipes(newRecipes: RecipeProperties[]) {
    recipes.value = newRecipes;
  }

  function addRecipe(recipe: RecipeProperties) {
    recipes.value.push(recipe);
  }

  function updateRecipe(recipe: RecipeProperties) {
    const index = recipes.value.findIndex((r) => r.id === recipe.id);
    recipes.value[index] = recipe;
  }

  function removeRecipe(recipeId: RecipeId) {
    recipes.value = recipes.value.filter((recipe) => recipe.id !== recipeId);
  }

  return {
    recipes,

    saveRecipes,
    addRecipe,
    updateRecipe,
    removeRecipe,
  };
});

export type RecipeStore = ReturnType<typeof useRecipeStore>;
