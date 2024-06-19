import { FastifyReply, FastifyRequest } from "fastify";
import { verify } from "jsonwebtoken";

export const auth = (
  req: FastifyRequest,
  reply: FastifyReply,
  done: () => void
) => {
  const authToken = req.headers.authorization;

  if (!authToken) return reply.status(401).send({ message: "Unauthorized" });

  const [, token] = authToken.split(" ");

  try {
    verify(token, "551f1009-fa1e-438d-a4c8-7d442e9e593d");
    done();
  } catch (error) {
    if (!authToken) return reply.status(401).send({ message: "Unauthorized" });
  }
};
