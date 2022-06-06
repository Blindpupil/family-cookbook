import type { RecipeRepository } from "@/domain/recipe/repository/RecipeRepository";
import type { RecipeToSave } from "@/domain/recipe/types";
import type { UserId } from "@/domain/user/types";
import type { UserRepository } from "@/domain/user/repository/UserRepository";
import { CreateRecipeUseCase } from "@/primary/recipe/use-cases/CreateRecipeUseCase";
import { GetRecipesUseCase } from "@/primary/recipe/use-cases/GetRecipesUseCase";

export class RecipeService {
  private getRecipesUseCase: GetRecipesUseCase;
  private createRecipeUseCase: CreateRecipeUseCase;

  constructor(
    private readonly recipeRepository: RecipeRepository,
    private readonly userRepository: UserRepository
  ) {
    this.getRecipesUseCase = new GetRecipesUseCase(recipeRepository);
    this.createRecipeUseCase = new CreateRecipeUseCase(
      recipeRepository,
      userRepository
    );
  }

  async getRecipes(userId: UserId) {
    return await this.getRecipesUseCase.execute(userId);
  }

  async createRecipe(form: RecipeToSave) {
    return await this.createRecipeUseCase.execute(form);
  }
}
