import type { RecipeId, RecipeProperties } from "@/hexagon/domain/recipe/types";
import { Ingredient } from "@/hexagon/domain/ingredient/Ingredient";

export class Recipe {
  private constructor(
    private readonly id: RecipeId,
    private readonly name: string,
    private readonly ingredients: Ingredient[],
    private readonly instructions: string,
    private portions: number,
    private readonly updatedAt: Date,
  ) {}

  static fromProperties(properties: RecipeProperties) {
    const { id, name, instructions, portions, updatedAt } = properties;
    const ingredients = properties.ingredients.map(Ingredient.fromProperties);

    return new Recipe(id, name, ingredients, instructions, portions, updatedAt);
  }

  get properties(): RecipeProperties {
    const ingredients = this.ingredients.map(
      (ingredient) => ingredient.properties,
    );

    return {
      id: this.id,
      name: this.name,
      ingredients,
      instructions: this.instructions,
      portions: this.portions,
      updatedAt: this.updatedAt,
    };
  }
}
