import type { RecipeRepository } from "@/hexagon/domain/recipe/repository/RecipeRepository";
import type { UserId } from "@/hexagon/domain/user/types";
import type { RecipeId, RecipeToSave } from "@/hexagon/domain/recipe/types";
import type { RecipeProperties } from "@/hexagon/domain/recipe/types";
import { Recipe } from "@/hexagon/domain/recipe/Recipe";

import type { RecipeHttp } from "@/hexagon/secondary/recipe/RecipeHttp";
import { useRecipeStore } from "@/hexagon/secondary/recipe/RecipeStore";

export class RecipeResource implements RecipeRepository {
  constructor(private readonly recipeHttp: RecipeHttp) {}

  get store() {
    return useRecipeStore();
  }

  async getRecipes(): Promise<Recipe[]> {
    const recipesInStore = this.store.recipes;
    if (recipesInStore.length !== 0) {
      return recipesInStore.map(Recipe.fromProperties);
    }

    const recipes = await this.recipeHttp.getRecipes();

    this.store.saveRecipes(recipes.map((recipe) => recipe.properties));

    return recipes;
  }

  async getFavoriteRecipes(userId: UserId): Promise<Recipe[]> {
    return await this.recipeHttp.getFavoriteRecipes(userId);
  }

  async createRecipe(userId: UserId, form: RecipeToSave): Promise<Recipe> {
    const recipe = await this.recipeHttp.createRecipe(userId, form);

    this.store.addRecipe(recipe.properties);

    return recipe;
  }

  async updateRecipe(form: RecipeProperties): Promise<Recipe> {
    const recipe = await this.recipeHttp.patchRecipe(form);

    this.store.updateRecipe(recipe.properties);

    return recipe;
  }

  async deleteRecipe(recipeId: RecipeId): Promise<void> {
    await this.recipeHttp.deleteRecipe(recipeId);

    this.store.removeRecipe(recipeId);
  }
}
