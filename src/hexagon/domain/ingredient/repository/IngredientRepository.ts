import type { Ingredient } from "@/hexagon/domain/ingredient/Ingredient";
import type { RecipeId } from "@/hexagon/domain/recipe/types";

export interface IngredientRepository {
  searchIngredients(text: string): Promise<Ingredient[]>;
}
