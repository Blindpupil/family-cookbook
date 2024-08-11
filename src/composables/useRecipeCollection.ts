import { computed, ref } from "vue";
import { RecipeCollection } from "@/primary/recipe/RecipeCollection";
import { recipeService } from "@/services/recipeService";

export async function useRecipeCollection() {
  const recipes = ref();
  recipes.value = await recipeService.getRecipes();

  return computed(() => new RecipeCollection(recipes.value));
}
