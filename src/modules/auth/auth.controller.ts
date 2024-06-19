import { FastifyReply, FastifyRequest } from "fastify";
import { AuthService } from "./auth.service";
import { AuthSignIn } from "../../interfaces/auth.interface";

class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }
  async signIn(
    req: FastifyRequest<{ Body: AuthSignIn }>,
    reply: FastifyReply
  ): Promise<void> {
    const { email, password } = req.body;

    try {
      const data = await this.authService.signIn({ email, password });

      reply.status(201).send(data);
    } catch (error) {
      reply.send(error);
    }
  }

  async generateAccessToken(
    req: FastifyRequest<{ Body: { refreshToken: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    const { refreshToken } = req.body;

    try {
      const data = await this.authService.generateAccessToken(refreshToken);

      reply.status(201).send(data);
    } catch (error) {
      reply.send(error);
    }
  }
}

export { AuthController };
