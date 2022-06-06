import { User } from "@/domain/user/User";
import type { UserRepository } from "@/domain/user/repository/UserRepository";
import type { UserProperties } from "@/domain/user/types";

export class UserResource implements UserRepository {
  getCurrentUser(): User {
    const jsonString = localStorage.getItem("user") as string;
    const userProperties = JSON.parse(jsonString) as UserProperties;

    return User.fromProperties(userProperties);
  }
}
