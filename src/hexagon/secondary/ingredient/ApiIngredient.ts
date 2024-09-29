import { Ingredient } from "@/hexagon/domain/ingredient/Ingredient";
import type { RecipeIngredientProperties } from "@/hexagon/secondary/ingredient/RecipeIngredientProperties";

export class ApiIngredient {
  constructor(
    public readonly id: number,
    public readonly name: string,
  ) {}

  toDomain(recipeIngredient: RecipeIngredientProperties): Ingredient {
    return Ingredient.fromProperties({
      id: this.id,
      name: this.name,
      quantity: recipeIngredient.quantity,
      unit: recipeIngredient.unit,
    });
  }
}
