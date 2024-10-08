import type { Unit } from "@/hexagon/domain/ingredient/enums";

export class InvalidUnitForConversionException extends Error {
  constructor(from: Unit, to: Unit, method: string) {
    super(`Can't convert ${from} ${to} with the method ${method}`);
  }
}
