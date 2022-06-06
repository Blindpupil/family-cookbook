import { Unit } from "@/domain/ingredient/enums";
import type { IngredientProperties } from "@/domain/ingredient/types";
import { InvalidUnitForConversionException } from "@/domain/ingredient/exceptions/InvalidUnitForConversionException";
import { OUNCE_IN_GRAMS } from "@/domain/ingredient/constants";

export class Ingredient {
  private constructor(
    private readonly id: string,
    private readonly name: string,
    private quantity: number,
    private unit: Unit,
    private readonly updatedAt: Date
  ) {}

  static fromProperties(properties: IngredientProperties): Ingredient {
    const { id, name, quantity, unit, updatedAt } = properties;
    return new Ingredient(id, name, quantity, unit, updatedAt);
  }

  get properties(): IngredientProperties {
    return {
      id: this.id,
      name: this.name,
      quantity: this.quantity,
      unit: this.unit,
      updatedAt: this.updatedAt,
    };
  }

  changeGramsToOunces() {
    if (this.unit !== Unit.g) {
      throw new InvalidUnitForConversionException(
        this.unit,
        Unit.oz,
        this.changeGramsToOunces.name
      );
    }

    const quantityInOunces = this.quantity / OUNCE_IN_GRAMS;
    this.unit = Unit.oz;
    this.quantity = quantityInOunces;
    return this;
  }

  changeOuncesToGrams() {
    if (this.unit !== Unit.oz) {
      throw new InvalidUnitForConversionException(
        this.unit,
        Unit.g,
        this.changeOuncesToGrams.name
      );
    }

    const quantityInGrams = this.quantity * OUNCE_IN_GRAMS;
    this.unit = Unit.g;
    this.quantity = quantityInGrams;
    return this;
  }
}
