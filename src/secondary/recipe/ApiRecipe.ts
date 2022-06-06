import type { RecipeId } from "@/domain/recipe/types";
import { Recipe } from "@/domain/recipe/Recipe";
import type { ApiIngredient } from "@/secondary/ingredient/ApiIngredient";

export class ApiRecipe {
  constructor(
    public readonly id: RecipeId,
    public readonly name: string,
    public readonly ingredients: ApiIngredient[],
    public readonly instructions: string,
    public readonly portions: number,
    public readonly updatedAt: string
  ) {}

  toDomain(): Recipe {
    const ingredients = this.ingredients.map((ingredient) =>
      ingredient.toDomain()
    );

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
