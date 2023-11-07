import type { UserId } from "@/domain/user/types";
import type { User } from "@/domain/user/User";

export class UserView {
  private constructor(
    public readonly id: UserId,
    public readonly name: string
  ) {}

  static fromDomain(user: User) {
    const { id, name } = user.properties;
    return new UserView(id, name);
  }
}
