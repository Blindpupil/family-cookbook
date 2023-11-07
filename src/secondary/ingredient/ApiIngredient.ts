import { Ingredient } from "@/domain/ingredient/Ingredient";
import type { RecipeIngredientProperties } from "@/secondary/ingredient/RecipeIngredientProperties";

export class ApiIngredient {
  constructor(
    public readonly id: number,
    public readonly name: string,
  ) {}

  toDomain(recipeIngredient: RecipeIngredientProperties): Ingredient {
    return Ingredient.fromProperties({
      id: String(this.id),
      name: this.name,
      quantity: recipeIngredient.quantity,
      unit: recipeIngredient.unit,
    });
  }
}
