import type { RecipeRepository } from "@/domain/recipe/repository/RecipeRepository";
import type { UserId } from "@/domain/user/types";
import type { RecipeId, RecipeToSave } from "@/domain/recipe/types";
import type { ApiRecipe } from "@/secondary/recipe/ApiRecipe";
import type { RestClient } from "@/secondary/RestClient";
import type { RecipeStore } from "@/secondary/recipe/RecipeStore";
import { Recipe } from "@/domain/recipe/Recipe";

export class RecipeResource implements RecipeRepository {
  constructor(
    private readonly restClient: RestClient,
    private readonly store: RecipeStore
  ) {}

  async getRecipes(userId: UserId): Promise<Recipe[]> {
    const recipesInStore = this.store.recipes;
    if (recipesInStore.length !== 0) {
      return recipesInStore.map(Recipe.fromProperties);
    }

    const apiRecipes = await this.restClient.get<ApiRecipe[]>(
      `/users/${userId}/recipes`
    );
    const recipes = apiRecipes.map((apiRecipe) => apiRecipe.toDomain());
    this.store.saveRecipes(recipes.map((recipe) => recipe.properties));

    return recipes;
  }

  async getFavoriteRecipes(userId: UserId): Promise<Recipe[]> {
    const apiRecipes = await this.restClient.get<ApiRecipe[]>(
      `/users/${userId}/recipes?favorites=true`
    );

    return apiRecipes.map((apiRecipe) => apiRecipe.toDomain());
  }

  async createRecipe(userId: UserId, form: RecipeToSave): Promise<Recipe> {
    const apiRecipe = await this.restClient.post<ApiRecipe, RecipeToSave>(
      `/users/${userId}/recipes`,
      form
    );

    return apiRecipe.toDomain();
  }

  async updateRecipe(recipeId: RecipeId, form: RecipeToSave): Promise<Recipe> {
    const apiRecipe = await this.restClient.post<ApiRecipe, RecipeToSave>(
      `/recipes/${recipeId}`,
      form
    );

    return apiRecipe.toDomain();
  }

  async deleteRecipe(recipeId: RecipeId): Promise<void> {
    await this.restClient.delete(`/recipes/${recipeId}`);
  }
}
