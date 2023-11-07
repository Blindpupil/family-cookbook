import type { RecipeId } from "@/domain/recipe/types";
import { Recipe } from "@/domain/recipe/Recipe";
import type { RecipeIngredientProperties } from "@/secondary/ingredient/RecipeIngredientProperties";
import { Ingredient } from "@/domain/ingredient/Ingredient";

export class ApiRecipe {
  constructor(
    public readonly id: RecipeId,
    public readonly name: string,
    public readonly ingredients: RecipeIngredientProperties[],
    public readonly instructions: string,
    public readonly portions: number,
    public readonly updatedAt: string,
  ) {}

  toDomain(ingredients: Ingredient[]): Recipe {
    return Recipe.fromProperties({
      id: this.id,
      name: this.name,
      ingredients: ingredients.map((ingredient) => ingredient.properties),
      instructions: this.instructions,
      portions: this.portions,
      updatedAt: new Date(this.updatedAt),
    });
  }
}
