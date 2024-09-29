import type { RecipeId, RecipeProperties } from "@/hexagon/domain/recipe/types";

import { IngredientView } from "@/hexagon/primary/ingredient/IngredientView";
import { EMOJIS } from "@/hexagon/primary/recipe/constants";
import type { IngredientProperties } from "@/hexagon/domain/ingredient/types";

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

  static fromProperties(
    recipe: RecipeProperties,
    ingredients: IngredientProperties[],
  ) {
    const { id, name, instructions, portions, updatedAt } = recipe;
    const ingredientViews = ingredients.map(IngredientView.fromProperties);

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
