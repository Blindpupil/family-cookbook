import type { RecipeRepository } from "@/domain/recipe/repository/RecipeRepository";
import type { RecipeToSave } from "@/domain/recipe/types";
import type { UserRepository } from "@/domain/user/repository/UserRepository";
import { Ingredient } from "@/domain/ingredient/Ingredient";

import { RecipeView } from "@/primary/recipe/RecipeView";

export class CreateRecipeUseCase {
  constructor(
    private readonly recipeRepository: RecipeRepository,
    private readonly userRepository: UserRepository
  ) {}

  async execute(form: RecipeToSave): Promise<RecipeView> {
    const userId = this.userRepository.getCurrentUser().properties.id;
    const recipe = await this.recipeRepository.createRecipe(userId, form);

    const ingredients = recipe.properties.ingredients.map(
      Ingredient.fromProperties
    );

    return RecipeView.fromDomain(recipe, ingredients);
  }
}
