import { Prisma, User } from "@prisma/client";
import { UserRepository, UserUpdate } from "../../interfaces/user.interface";
import { v4 as uuid } from "uuid";

class UserRepositoryInMemory implements UserRepository {
  private users: User[] = [];

  async create(user: User): Promise<User> {
    Object.assign(user, {
      id: uuid(),
    });

    this.users.push(user);
    return user;
  }

  async updateUser(user: User): Promise<User> {
    const userIndex = this.users.findIndex((item) => item.id == user.id);

    if (userIndex === -1) throw new Error("User not found");

    this.users[userIndex] = { ...this.users[userIndex], ...user };

    return this.users[userIndex];
  }

  async getAllUsers(): Promise<User[]> {
    return this.users;
  }

  async deleteUser(id: number): Promise<User> {
    const user = this.users.find((user) => user.id == id);

    if (!user) throw new Error("User not found");

    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email == email);

    return user || null;
  }

  async findUserById(id: number): Promise<User | null> {
    const user = this.users.find((user) => user.id == id);

    return user || null;
  }
}

export { UserRepositoryInMemory };
