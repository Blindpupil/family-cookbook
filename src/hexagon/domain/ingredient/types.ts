import type { Unit } from "@/hexagon/domain/ingredient/enums";

export type IngredientProperties = {
  id: number;
  quantity: number;
  unit: Unit;
};
