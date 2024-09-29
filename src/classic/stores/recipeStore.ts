import { defineStore } from "pinia";
import { ref } from "vue";
import { type Recipe, recipeHttp } from "@/classic/http/recipeHttp";

export const useRecipeStore = defineStore("recipeStore", () => {
  const recipes = ref<Recipe[]>([]);

  async function getRecipes() {
    recipes.value = await recipeHttp.getRecipes();

    return recipes.value;
  }

  function searchByName(term: string) {
    return recipes.value.filter((recipe) =>
      recipe.name.toLowerCase().includes(term.toLowerCase()),
    );
  }

  return {
    recipes,

    getRecipes,
    searchByName,
  };
});
