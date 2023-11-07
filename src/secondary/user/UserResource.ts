import { User } from "@/domain/user/User";
import type { UserRepository } from "@/domain/user/repository/UserRepository";

export class UserResource implements UserRepository {
  getCurrentUser(): User {
    return User.fromProperties({
      id: "fake-id",
      name: "Cesar",
    });
  }
}
