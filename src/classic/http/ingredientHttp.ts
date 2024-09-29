import type { HttpRecipeIngredient } from "@/classic/http/recipeHttp";
import { httpClient } from "@/classic/http/HttpClient";

export type HttpIngredient = {
  id: number;
  name: string;
};

export const ingredientHttp = {
  async getNamedRecipeIngredients(ingredients: HttpRecipeIngredient[]) {
    const result: Array<HttpRecipeIngredient & HttpIngredient> = [];
    for (const ingredient of ingredients) {
      const named = await httpClient.get<HttpIngredient>(
        `ingredients/${ingredient.id}`,
      );
      result.push({ ...ingredient, ...named });
    }
    return result;
  },
};
