import type { RecipeRepository } from "@/hexagon/domain/recipe/repository/RecipeRepository";
import type { UserRepository } from "@/hexagon/domain/user/repository/UserRepository";
import { Ingredient } from "@/hexagon/domain/ingredient/Ingredient";

import { RecipeView } from "@/hexagon/primary/recipe/RecipeView";

export class GetRecipesUseCase {
  constructor(
    private readonly recipeRepository: RecipeRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(): Promise<RecipeView[]> {
    const user = this.userRepository.getCurrentUser();
    const recipes = await this.recipeRepository.getRecipes(user.properties.id);

    return recipes.map((recipe) => {
      const ingredients = recipe.properties.ingredients.map(
        Ingredient.fromProperties,
      );

      return RecipeView.fromProperties(recipe, ingredients);
    });
  }
}
