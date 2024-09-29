import type { IngredientProperties } from "@/hexagon/domain/ingredient/types";

export type RecipeId = string;

export type RecipeProperties = {
  id: string;
  name: string;
  ingredients: IngredientProperties[];
  instructions: string;
  portions: number;
  updatedAt: Date;
};

export type RecipeToSave = Omit<RecipeProperties, "id">;
