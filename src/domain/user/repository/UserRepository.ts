import type { User } from "@/domain/user/User";

export interface UserRepository {
  getCurrentUser(): User;
}
