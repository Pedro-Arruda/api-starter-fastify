import { User } from "@prisma/client";
import { prisma } from "../database/prisma-client";
import {
  UserCreate,
  UserRepository,
  UserUpdate,
} from "../interfaces/user.interface";

class UserRepositoryPrisma implements UserRepository {
  async create(data: UserCreate): Promise<User> {
    const result = await prisma.user.create({
      data: { email: data.email, name: data.name },
    });
    return result;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const result = await prisma.user.findFirst({ where: { email } });
    return result || null;
  }

  async findUserById(id: number): Promise<User | null> {
    const result = await prisma.user.findFirst({ where: { id } });
    return result || null;
  }

  async updateUser({ id, email, name }: UserUpdate): Promise<User> {
    const result = await prisma.user.update({
      data: { name, email },
      where: { id },
    });

    return result;
  }

  async getAllUsers(): Promise<User[]> {
    const result = await prisma.user.findMany();

    return result;
  }

  async deleteUser(id: number) {
    const result = await prisma.user.delete({ where: { id } });
    return result || null;
  }
}

export { UserRepositoryPrisma };
