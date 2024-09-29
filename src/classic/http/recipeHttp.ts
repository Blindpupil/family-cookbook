import { httpClient } from "@/classic/http/HttpClient";
import {
  type HttpIngredient,
  ingredientHttp,
} from "@/classic/http/ingredientHttp";

export type HttpRecipeIngredient = {
  id: number;
  quantity: number;
  unit: string;
};

export type HttpRecipe = {
  id: number;
  name: string;
  ingredients: HttpRecipeIngredient[];
  instructions: string;
  portions: number;
};

export type Recipe = {
  id: number;
  name: string;
  ingredients: Array<HttpRecipeIngredient & HttpIngredient>;
  instructions: string;
  portions: number;
};

export const recipeHttp = {
  async getRecipes() {
    const httpRecipes = await httpClient.get<HttpRecipe[]>("recipes");
    const result: Recipe[] = [];

    for (const recipe of httpRecipes) {
      result.push({
        ...recipe,
        ingredients: await ingredientHttp.getNamedRecipeIngredients(
          recipe.ingredients,
        ),
      });
    }

    return result;
  },

  async getRecipe(recipeId: number) {
    const httpRecipe = await httpClient.get<HttpRecipe>(`recipes/${recipeId}`);
    return {
      ...httpRecipe,
      ingredients: await ingredientHttp.getNamedRecipeIngredients(
        httpRecipe.ingredients,
      ),
    };
  },

  async getFavoriteRecipes(userId: string) {
    console.log(`mocking FavoriteRecipes for ${userId}`);
    return await this.getRecipes();
  },

  async createRecipe(userId: string, form: Partial<HttpRecipe>) {
    console.log(`mocking CreateRecipe for ${userId}`);
    const recipe = await httpClient.post<HttpRecipe, Partial<HttpRecipe>>(
      "recipes",
      form,
    );

    return this.getRecipe(recipe.id);
  },

  async deleteRecipe(recipeId: number) {
    await httpClient.delete(`recipes/${recipeId}`);
  },
};
