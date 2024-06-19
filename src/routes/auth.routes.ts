import { UserSchema } from "../../prisma/generated/zod";
import { authFactory } from "../modules/auth/auth.factory";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import {
  AuthAccessTokenSchema,
  AuthSignIn,
  AuthSignInSchema,
} from "../interfaces/auth.interface";

export async function authRoutes(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>();

  fastify.post(
    "/sign-in",
    {
      schema: {
        tags: ["Auth"],
        body: AuthSignInSchema,
        response: { 200: AuthSignInSchema },
      },
    },
    async (req: FastifyRequest<{ Body: AuthSignIn }>, reply: FastifyReply) =>
      authFactory().signIn(req, reply)
  );

  fastify.post(
    "/access-token",
    {
      schema: {
        tags: ["Auth"],
        body: AuthAccessTokenSchema,
        response: { 200: UserSchema },
      },
    },
    async (
      req: FastifyRequest<{ Body: { refreshToken: string } }>,
      reply: FastifyReply
    ) => authFactory().generateAccessToken(req, reply)
  );
}

export default authRoutes;
