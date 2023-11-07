import type { RecipeRepository } from "@/domain/recipe/repository/RecipeRepository";
import type { RecipeToSave } from "@/domain/recipe/types";
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
    this.getRecipesUseCase = new GetRecipesUseCase(
      recipeRepository,
      userRepository
    );
    this.createRecipeUseCase = new CreateRecipeUseCase(
      recipeRepository,
      userRepository
    );
  }

  async getRecipes() {
    return await this.getRecipesUseCase.execute();
  }

  async createRecipe(form: RecipeToSave) {
    return await this.createRecipeUseCase.execute(form);
  }
}
