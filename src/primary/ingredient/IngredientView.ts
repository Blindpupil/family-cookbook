import type { Unit } from "@/domain/ingredient/enums";
import type { Ingredient } from "@/domain/ingredient/Ingredient";

export class IngredientView {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly quantity: number,
    public readonly unit: Unit,
    public readonly updatedAt: string
  ) {}

  fromDomain(ingredient: Ingredient): IngredientView {
    const { id, name, quantity, unit, updatedAt } = ingredient.properties;

    return new IngredientView(
      id,
      name,
      quantity,
      unit,
      updatedAt.toLocaleDateString()
    );
  }
}
