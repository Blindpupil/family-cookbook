import type { UserId } from "@/hexagon/domain/user/types";
import type {
  RecipeId,
  RecipeProperties,
  RecipeToSave,
} from "@/hexagon/domain/recipe/types";
import { ApiIngredient } from "@/hexagon/secondary/ingredient/ApiIngredient";
import { ApiRecipe } from "@/hexagon/secondary/recipe/ApiRecipe";
import { type RestClient, restClient } from "@/hexagon/secondary/RestClient";

export class RecipeHttp {
  constructor(private client: RestClient) {}

  private apiIngredients: ApiIngredient[] = [];
  private async setRecipeApiIngredients(apiRecipe: ApiRecipe) {
    for (const recipeIngredient of apiRecipe.ingredients) {
      if (this.apiIngredients.some((api) => api.id === recipeIngredient.id))
        continue;

      const { id, name }: ApiIngredient = await this.client.get(
        `ingredients/${recipeIngredient.id}`,
      );
      this.apiIngredients.push(new ApiIngredient(id, name));
    }
  }
  private getRecipeWithIngredients(apiRecipe: ApiRecipe) {
    const ingredients = apiRecipe.ingredients.map((recipeIngredient) => {
      const apiIngredient = this.apiIngredients.find(
        (ingredient) => ingredient.id === recipeIngredient.id,
      )!;
      return apiIngredient.toDomain(recipeIngredient);
    });
    return apiRecipe.toDomain(ingredients);
  }

  async getRecipes() {
    const result: ApiRecipe[] = await this.client.get("recipes");
    const apiRecipes = result.map(
      (recipe) =>
        new ApiRecipe(
          recipe.id,
          recipe.name,
          recipe.ingredients,
          recipe.instructions,
          recipe.portions,
          recipe.updatedAt,
        ),
    );

    for (const apiRecipe of apiRecipes) {
      await this.setRecipeApiIngredients(apiRecipe);
    }

    return apiRecipes.map(this.getRecipeWithIngredients.bind(this));
  }

  async getFavoriteRecipes(userId: UserId) {
    console.log(`mocking FavoriteRecipes for ${userId}`);
    return await this.getRecipes();
  }

  async createRecipe(userId: UserId, form: RecipeToSave) {
    console.log(`mocking CreateRecipe for ${userId}`);
    const apiRecipe = await this.client.post<ApiRecipe, RecipeToSave>(
      "recipes",
      form,
    );
    await this.setRecipeApiIngredients(apiRecipe);

    return this.getRecipeWithIngredients(apiRecipe);
  }

  async patchRecipe(form: RecipeProperties) {
    console.log(`mocking PatchRecipe ${form.name}`);
    const apiRecipe = await this.client.patch<ApiRecipe, RecipeToSave>(
      `recipes/${form.id}`,
      form,
    );
    await this.setRecipeApiIngredients(apiRecipe);

    return this.getRecipeWithIngredients(apiRecipe);
  }

  async deleteRecipe(recipeId: RecipeId) {
    await this.client.delete(`recipes/${recipeId}`);
  }
}

export const recipeHttp = new RecipeHttp(restClient);
