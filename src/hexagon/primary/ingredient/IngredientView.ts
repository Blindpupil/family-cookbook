import type { Unit } from "@/hexagon/domain/ingredient/enums";
import type { IngredientProperties } from "@/hexagon/domain/ingredient/types";

export class IngredientView {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly quantity: number,
    public readonly unit: Unit,
  ) {}

  static fromProperties(ingredient: IngredientProperties): IngredientView {
    const { id, name, quantity, unit } = ingredient;

    return new IngredientView(String(id), name, quantity, unit);
  }
}
