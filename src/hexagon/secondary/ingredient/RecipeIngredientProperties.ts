import { Unit } from "@/hexagon/domain/ingredient/enums";

export type RecipeIngredientProperties = {
  id: number;
  name: string;
  unit: Unit;
  quantity: number;
};
