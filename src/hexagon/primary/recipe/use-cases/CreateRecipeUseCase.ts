import type { RecipeRepository } from "@/hexagon/domain/recipe/repository/RecipeRepository";
import type { RecipeToSave } from "@/hexagon/domain/recipe/types";
import type { UserRepository } from "@/hexagon/domain/user/repository/UserRepository";
import { Ingredient } from "@/hexagon/domain/ingredient/Ingredient";

import { RecipeView } from "@/hexagon/primary/recipe/RecipeView";

export class CreateRecipeUseCase {
  constructor(
    private readonly recipeRepository: RecipeRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(form: RecipeToSave): Promise<RecipeView> {
    const userId = this.userRepository.getCurrentUser().properties.id;
    const recipe = await this.recipeRepository.createRecipe(userId, form);

    const ingredients = recipe.properties.ingredients.map(
      Ingredient.fromProperties,
    );

    return RecipeView.fromProperties(recipe, ingredients);
  }
}
