import { FastifyInstance } from "fastify";
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

export async function userRoutes(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>();

  const userUseCase = new UserUseCase();

  fastify.post<{ Body: UserCreate }>(
    "/",
    { schema: { body: UserCreateSchema, tags: ["Users"] } },
    async (req, res) => {
      const { email, name } = req.body;

      try {
        const data = await userUseCase.create({ email, name });

        res.send(data);
      } catch (error) {
        res.send(error);
      }
    }
  );

  fastify.get(
    "/",
    {
      schema: {
        response: {
          200: z.array(UserSchema),
        },
        tags: ["Users"],
      },
    },
    async (req, res) => {
      try {
        const data = await userUseCase.getAllUsers();

        res.send(data);
      } catch (error) {
        res.send(error);
      }
    }
  );

  fastify.get<{ Params: { id: Number } }>(
    "/:id",
    {
      schema: {
        response: {
          200: UserSchema,
        },
        tags: ["Users"],
      },
    },
    async (req, res) => {
      const { id } = req.params;

      try {
        const data = await userUseCase.findOneUser(Number(id));

        res.send(data);
      } catch (error) {
        res.send(error);
      }
    }
  );

  fastify.patch<{ Body: UserUpdate; Params: { id: number } }>(
    "/:id",
    {
      schema: {
        body: UserUpdateSchema,
        response: { 200: UserSchema },
        tags: ["Users"],
      },
    },
    async (req, res) => {
      try {
        const { id } = req.params;
        const { name, email } = req.body;

        const data = await userUseCase.updateUser({
          email,
          name,
          id: Number(id),
        });

        return data;
      } catch (error) {
        res.send(error);
      }
    }
  );

  fastify.delete<{ Params: { id: Number } }>(
    "/:id",
    {
      schema: {
        response: {
          200: UserSchema,
        },
        tags: ["Users"],
      },
    },
    async (req, res) => {
      const { id } = req.params;

      try {
        const data = await userUseCase.deleteUser(Number(id));

        res.send(data);
      } catch (error) {
        res.send(error);
      }
    }
  );
}

export default userRoutes;
