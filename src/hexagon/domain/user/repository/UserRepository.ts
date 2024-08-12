import type { User } from "@/hexagon/domain/user/User";

export interface UserRepository {
  getCurrentUser(): User;
}
