import { Unit } from "@/domain/ingredient/enums";

export type RecipeIngredientProperties = {
  id: number;
  unit: Unit;
  quantity: number;
};
