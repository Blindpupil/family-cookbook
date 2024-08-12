import type { Recipe } from "@/hexagon/domain/recipe/Recipe";
import type { RecipeId } from "@/hexagon/domain/recipe/types";
import type { Ingredient } from "@/hexagon/domain/ingredient/Ingredient";

import { IngredientView } from "@/hexagon/primary/ingredient/IngredientView";
import { EMOJIS } from "@/hexagon/primary/recipe/constants";

export class RecipeView {
  private constructor(
    public readonly id: RecipeId,
    public readonly name: string,
    public readonly ingredients: IngredientView[],
    public readonly instructions: string,
    public portions: number,
    public readonly updatedAt: string,
  ) {}

  public isSelected = false;

  static fromDomain(recipe: Recipe, ingredients: Ingredient[]) {
    const { id, name, instructions, portions, updatedAt } = recipe.properties;
    const ingredientViews = ingredients.map(IngredientView.fromDomain);

    return new RecipeView(
      id,
      name,
      ingredientViews,
      instructions,
      portions,
      updatedAt.toLocaleDateString(),
    );
  }

  toggle() {
    this.isSelected = !this.isSelected;
    return this;
  }

  get mealSizeIcon() {
    switch (this.portions) {
      case 1:
        return EMOJIS.single;
      case 2:
        return EMOJIS.couple;
      case 3:
        return EMOJIS.oneKid;
      default:
        return EMOJIS.twoKids;
    }
  }
}
