import { User } from "@prisma/client";
import { prisma } from "../../database/prisma-client";
import { AuthRepository, AuthSignIn } from "../../interfaces/auth.interface";

class AuthRepositoryPrisma implements AuthRepository {
  async findUserByEmail(email: string): Promise<User | null> {
    const result = await prisma.user.findFirst({ where: { email } });

    return result || null;
  }
}

export { AuthRepositoryPrisma };
