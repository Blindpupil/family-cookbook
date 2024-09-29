import type { UserId, UserProperties } from "@/hexagon/domain/user/types";

export class UserView {
  private constructor(
    public readonly id: UserId,
    public readonly name: string,
  ) {}

  static fromProperties(user: UserProperties) {
    const { id, name } = user;
    return new UserView(id, name);
  }
}
