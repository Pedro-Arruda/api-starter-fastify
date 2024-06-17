import { UserRepositoryPrisma } from "../../repositories/prisma/user.repositoryPrisma";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

export const userFactory = () => {
  const userRepository = new UserRepositoryPrisma();
  const userService = new UserService(userRepository);
  const userController = new UserController(userService);
  return userController;
};
