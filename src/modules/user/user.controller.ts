import { FastifyReply, FastifyRequest } from "fastify";
import { UserService } from "./user.service";
import { UserCreate } from "../../interfaces/user.interface";

class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }
  async createUser(
    req: FastifyRequest<{ Body: UserCreate }>,
    reply: FastifyReply
  ): Promise<void> {
    const { email, name, password } = req.body;

    try {
      const data = await this.userService.create({ email, name, password });

      reply.status(201).send(data);
    } catch (error) {
      reply.send(error);
    }
  }

  async getAllUsers(req: FastifyRequest, reply: FastifyReply) {
    try {
      const data = await this.userService.getAllUsers();

      reply.send(data);
    } catch (error) {
      reply.send(error);
    }
  }

  async getOneUser(
    req: FastifyRequest<{ Params: { id: number } }>,
    reply: FastifyReply
  ) {
    const { id } = req.params;

    try {
      const data = await this.userService.findOneUser(id);

      reply.send(data);
    } catch (error) {
      reply.send(error);
    }
  }

  async updateUser(
    req: FastifyRequest<{ Body: UserCreate; Params: { id: number } }>,
    reply: FastifyReply
  ) {
    const { id } = req.params;
    const { email, name } = req.body;

    try {
      const data = await this.userService.updateUser({ id, email, name });

      reply.send(data);
    } catch (error) {
      reply.send(error);
    }
  }

  async deleteUser(
    req: FastifyRequest<{ Params: { id: number } }>,
    reply: FastifyReply
  ) {
    const { id } = req.params;

    try {
      const data = await this.userService.deleteUser(id);

      reply.send(data);
    } catch (error) {
      reply.send(error);
    }
  }
}

export { UserController };
