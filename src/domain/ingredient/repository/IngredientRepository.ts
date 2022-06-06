import type { Ingredient } from "@/domain/ingredient/Ingredient";
import type { RecipeId } from "@/domain/recipe/types";

export interface IngredientRepository {
  searchIngredients(text: string): Promise<Ingredient[]>;
}
