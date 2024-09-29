import type { Unit } from "@/hexagon/domain/ingredient/enums";

export type IngredientProperties = {
  id: number;
  quantity: number;
  name: string;
  unit: Unit;
};
