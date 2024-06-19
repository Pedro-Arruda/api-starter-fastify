import { z } from "zod";
import { FastifyInstance, FastifyRequest } from "fastify";
import { UserSchema } from "../../prisma/generated/zod";
import { userFactory } from "../modules/user/user.factory";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { UserCreate, UserCreateSchema } from "../interfaces/user.interface";
import { auth } from "../middlewares/auth";

export async function userRoutes(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>();
  fastify.addHook("onRequest", auth);

  fastify.post(
    "/",
    {
      schema: {
        tags: ["Users"],
        body: UserCreateSchema,
        response: { 200: UserSchema },
        security: [{ bearerAuth: [] }],
      },
    },
    async (req: FastifyRequest<{ Body: UserCreate }>, reply) =>
      userFactory().createUser(req, reply)
  );

  fastify.get(
    "/",
    {
      schema: {
        tags: ["Users"],
        response: { 200: z.array(UserSchema) },
        security: [{ bearerAuth: [] }],
      },
    },
    async (req: FastifyRequest, reply) => userFactory().getAllUsers(req, reply)
  );

  fastify.get(
    "/:id",
    {
      schema: {
        tags: ["Users"],
        response: { 200: UserSchema },
        security: [{ bearerAuth: [] }],
      },
    },
    async (req: FastifyRequest<{ Params: { id: number } }>, reply) =>
      userFactory().getOneUser(req, reply)
  );

  fastify.patch(
    "/:id",
    {
      schema: {
        tags: ["Users"],
        body: UserCreateSchema,
        response: { 200: UserSchema },
        security: [{ bearerAuth: [] }],
      },
    },
    async (
      req: FastifyRequest<{ Body: UserCreate; Params: { id: number } }>,
      reply
    ) => userFactory().updateUser(req, reply)
  );

  fastify.delete(
    "/:id",
    {
      schema: {
        tags: ["Users"],
        response: { 200: UserSchema },
        security: [{ bearerAuth: [] }],
      },
    },
    async (req: FastifyRequest<{ Params: { id: number } }>, reply) =>
      userFactory().deleteUser(req, reply)
  );
}

export default userRoutes;
