import { User } from "@/hexagon/domain/user/User";
import type { UserRepository } from "@/hexagon/domain/user/repository/UserRepository";

export class UserResource implements UserRepository {
  getCurrentUser(): User {
    return User.fromProperties({
      id: "fake-id",
      name: "Cesar",
    });
  }
}
