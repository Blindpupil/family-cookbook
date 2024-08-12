import type { RecipeRepository } from "@/hexagon/domain/recipe/repository/RecipeRepository";
import type { RecipeToSave } from "@/hexagon/domain/recipe/types";
import type { UserRepository } from "@/hexagon/domain/user/repository/UserRepository";
import { CreateRecipeUseCase } from "@/hexagon/primary/recipe/use-cases/CreateRecipeUseCase";
import { GetRecipesUseCase } from "@/hexagon/primary/recipe/use-cases/GetRecipesUseCase";

export class RecipeService {
  private getRecipesUseCase: GetRecipesUseCase;
  private createRecipeUseCase: CreateRecipeUseCase;

  constructor(
    private readonly recipeRepository: RecipeRepository,
    private readonly userRepository: UserRepository,
  ) {
    this.getRecipesUseCase = new GetRecipesUseCase(
      recipeRepository,
      userRepository,
    );
    this.createRecipeUseCase = new CreateRecipeUseCase(
      recipeRepository,
      userRepository,
    );
  }

  async getRecipes() {
    return await this.getRecipesUseCase.execute();
  }

  async createRecipe(form: RecipeToSave) {
    return await this.createRecipeUseCase.execute(form);
  }
}
