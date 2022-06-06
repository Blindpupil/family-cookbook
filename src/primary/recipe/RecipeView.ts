import type { Recipe } from "@/domain/recipe/Recipe";
import type { RecipeId } from "@/domain/recipe/types";
import type { Ingredient } from "@/domain/ingredient/Ingredient";

export class RecipeView {
  private constructor(
    public readonly id: RecipeId,
    public readonly name: string,
    public readonly ingredients: Ingredient[],
    public readonly instructions: string,
    public readonly portions: number,
    public readonly updatedAt: string
  ) {}

  static fromDomain(recipe: Recipe) {
    const { id, name, ingredients, instructions, portions, updatedAt } =
      recipe.properties;
    return new RecipeView(
      id,
      name,
      ingredients,
      instructions,
      portions,
      updatedAt.toLocaleDateString()
    );
  }

  get mealSizeIcon() {
    switch (this.portions) {
      case 1:
        return "single";
      case 2:
        return "couple";
      case 3:
        return "family-one-kid";
      default:
        return "family-two-kids";
    }
  }
}
