import { AuthRepositoryPrisma } from "../../repositories/prisma/auth.repositoryPrisma";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

export const authFactory = () => {
  const authRepository = new AuthRepositoryPrisma();
  const authService = new AuthService(authRepository);
  const authController = new AuthController(authService);
  return authController;
};
