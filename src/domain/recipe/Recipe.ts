import type { RecipeId, RecipeProperties } from "@/domain/recipe/types";
import { Ingredient } from "@/domain/ingredient/Ingredient";

export class Recipe {
  // Made domain properties public to showcase _classic.vue files. Should be private
  private constructor(
    public readonly id: RecipeId,
    public readonly name: string,
    public readonly ingredients: Ingredient[],
    public readonly instructions: string,
    public portions: number,
    public readonly updatedAt: Date,
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
