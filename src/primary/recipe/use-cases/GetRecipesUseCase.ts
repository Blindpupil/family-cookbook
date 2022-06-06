import type { RecipeRepository } from "@/domain/recipe/repository/RecipeRepository";
import type { UserId } from "@/domain/user/types";
import { RecipeView } from "@/primary/recipe/RecipeView";

export class GetRecipesUseCase {
  constructor(private readonly recipeRepository: RecipeRepository) {}

  async execute(userId: UserId): Promise<RecipeView[]> {
    const recipes = await this.recipeRepository.getRecipes(userId);

    return recipes.map(RecipeView.fromDomain);
  }
}
