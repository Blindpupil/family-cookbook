import type { Unit } from "@/hexagon/domain/ingredient/enums";
import type { Ingredient } from "@/hexagon/domain/ingredient/Ingredient";

export class IngredientView {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly quantity: number,
    public readonly unit: Unit,
  ) {}

  static fromDomain(ingredient: Ingredient): IngredientView {
    const { id, name, quantity, unit } = ingredient.properties;

    return new IngredientView(id, name, quantity, unit);
  }
}
