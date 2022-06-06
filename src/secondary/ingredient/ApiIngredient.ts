import type { Unit } from "@/domain/ingredient/enums";
import { Ingredient } from "@/domain/ingredient/Ingredient";

export class ApiIngredient {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly quantity: number,
    public readonly unit: Unit,
    public readonly updatedAt: string
  ) {}

  toDomain(): Ingredient {
    return Ingredient.fromProperties({
      id: this.id,
      name: this.name,
      quantity: this.quantity,
      unit: this.unit,
      updatedAt: new Date(this.updatedAt),
    });
  }
}
