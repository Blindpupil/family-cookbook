import type { IngredientProperties } from "@/hexagon/domain/ingredient/types";
import { Unit } from "@/hexagon/domain/ingredient/enums";
import { InvalidUnitForConversionException } from "@/hexagon/domain/ingredient/exceptions/InvalidUnitForConversionException";
import { OUNCE_IN_GRAMS } from "@/hexagon/domain/ingredient/constants";

export class Ingredient {
  // Make domain properties public to showcase _classic.vue files.
  private constructor(
    private readonly id: number,
    private readonly name: string,
    private quantity: number,
    private unit: Unit,
  ) {}

  static fromProperties(properties: IngredientProperties): Ingredient {
    const { id, name, quantity, unit } = properties;
    return new Ingredient(id, name, quantity, unit);
  }

  get properties(): IngredientProperties {
    return {
      id: this.id,
      name: this.name,
      quantity: this.quantity,
      unit: this.unit,
    };
  }

  changeGramsToOunces() {
    if (this.unit !== Unit.g) {
      throw new InvalidUnitForConversionException(
        this.unit,
        Unit.oz,
        this.changeGramsToOunces.name,
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
        this.changeOuncesToGrams.name,
      );
    }

    const quantityInGrams = this.quantity * OUNCE_IN_GRAMS;
    this.unit = Unit.g;
    this.quantity = quantityInGrams;
    return this;
  }
}
