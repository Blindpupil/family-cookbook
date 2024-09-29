import type { UserId, UserProperties } from "@/hexagon/domain/user/types";

export class User {
  private constructor(
    private readonly id: UserId,
    private readonly name: string,
  ) {}

  static fromProperties(properties: UserProperties): User {
    return new User(properties.id, properties.name);
  }

  get properties(): UserProperties {
    return {
      id: this.id,
      name: this.name,
    };
  }
}
