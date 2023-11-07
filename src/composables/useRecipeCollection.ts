import { recipeService } from "@/services/recipeService";
import { computed, ref } from "vue";
import { RecipeCollection } from "@/primary/recipe/RecipeCollection";

export async function useRecipeCollection() {
  const recipes = ref();
  recipes.value = await recipeService.getRecipes();

  return computed(() => new RecipeCollection(recipes.value));
}
