import { FastifyInstance, FastifyRequest } from "fastify";
import { UserUseCase } from "../usecases/user.usecases";
import {
  UserCreate,
  UserCreateSchema,
  UserUpdate,
  UserUpdateSchema,
} from "../interfaces/user.interface";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { UserSchema } from "../../prisma/generated/zod";
import { z } from "zod";
import { UserRepositoryPrisma } from "../repositories/user.repository";
import { UserService } from "../modules/user/user.service";
import { UserController } from "../modules/user/user.controller";

export async function userRoutes(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>();

  const userRepository = new UserRepositoryPrisma();
  const userService = new UserService(userRepository);
  const userController = new UserController(userService);

  fastify.post(
    "/",
    {
      schema: {
        tags: ["Users"],
        body: UserCreateSchema,
        response: { 200: UserSchema },
      },
    },
    async (req: FastifyRequest<{ Body: UserCreate }>, reply) =>
      userController.createUser(req, reply)
  );

  fastify.get(
    "/",
    {
      schema: {
        tags: ["Users"],
        response: { 200: z.array(UserSchema) },
      },
    },
    async (req: FastifyRequest, reply) => userController.getAllUsers(req, reply)
  );

  fastify.get(
    "/:id",
    {
      schema: {
        tags: ["Users"],
        response: { 200: UserSchema },
      },
    },
    async (req: FastifyRequest<{ Params: { id: number } }>, reply) =>
      userController.getOneUser(req, reply)
  );

  fastify.patch(
    "/:id",
    {
      schema: {
        tags: ["Users"],
        body: UserCreateSchema,
        response: { 200: UserSchema },
      },
    },
    async (
      req: FastifyRequest<{ Body: UserCreate; Params: { id: number } }>,
      reply
    ) => userController.updateUser(req, reply)
  );

  fastify.delete(
    "/:id",
    {
      schema: {
        tags: ["Users"],
        response: { 200: UserSchema },
      },
    },
    async (req: FastifyRequest<{ Params: { id: number } }>, reply) =>
      userController.deleteUser(req, reply)
  );
}

export default userRoutes;
