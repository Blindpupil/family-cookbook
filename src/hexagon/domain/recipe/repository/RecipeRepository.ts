import type { Recipe } from "@/hexagon/domain/recipe/Recipe";
import type { RecipeId, RecipeToSave } from "@/hexagon/domain/recipe/types";
import type { UserId } from "@/hexagon/domain/user/types";
import type { RecipeProperties } from "@/hexagon/domain/recipe/types";

export interface RecipeRepository {
  getRecipes(userId: UserId): Promise<Recipe[]>;

  getFavoriteRecipes(userId: UserId): Promise<Recipe[]>;

  createRecipe(userId: UserId, form: RecipeToSave): Promise<Recipe>;

  updateRecipe(form: RecipeProperties): Promise<Recipe>;

  deleteRecipe(recipeId: RecipeId): Promise<void>;
}
