import type { RecipeRepository } from "@/domain/recipe/repository/RecipeRepository";
import type { UserRepository } from "@/domain/user/repository/UserRepository";
import { Ingredient } from "@/domain/ingredient/Ingredient";

import { RecipeView } from "@/primary/recipe/RecipeView";

export class GetRecipesUseCase {
  constructor(
    private readonly recipeRepository: RecipeRepository,
    private readonly userRepository: UserRepository
  ) {}

  async execute(): Promise<RecipeView[]> {
    const user = this.userRepository.getCurrentUser();
    const recipes = await this.recipeRepository.getRecipes(user.properties.id);

    return recipes.map((recipe) => {
      const ingredients = recipe.properties.ingredients.map(
        Ingredient.fromProperties
      );

      return RecipeView.fromDomain(recipe, ingredients);
    });
  }
}
