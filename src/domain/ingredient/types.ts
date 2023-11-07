import type { Unit } from "@/domain/ingredient/enums";

export type IngredientProperties = {
  id: string;
  name: string;
  quantity: number;
  unit: Unit;
};
