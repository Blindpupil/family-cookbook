import type { IngredientProperties } from "@/domain/ingredient/types";
import { Unit } from "@/domain/ingredient/enums";
import { InvalidUnitForConversionException } from "@/domain/ingredient/exceptions/InvalidUnitForConversionException";
import { OUNCE_IN_GRAMS } from "@/domain/ingredient/constants";

export class Ingredient {
  // Made domain properties public to showcase _classic.vue files. Should be private
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public quantity: number,
    public unit: Unit,
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
