import type { Recipe } from "@/domain/recipe/Recipe";
import type { RecipeId, RecipeToSave } from "@/domain/recipe/types";
import type { UserId } from "@/domain/user/types";

export interface RecipeRepository {
  getRecipes(userId: UserId): Promise<Recipe[]>;

  getFavoriteRecipes(userId: UserId): Promise<Recipe[]>;

  createRecipe(userId: UserId, form: RecipeToSave): Promise<Recipe>;

  updateRecipe(recipeId: RecipeId, form: RecipeToSave): Promise<Recipe>;

  deleteRecipe(recipeId: RecipeId): Promise<void>;
}
