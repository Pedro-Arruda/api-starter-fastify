import { User } from "../../prisma/generated/zod";
import {
  UserCreate,
  UserRepository,
  UserUpdate,
} from "../interfaces/user.interface";
import { UserRepositoryPrisma } from "../repositories/user.repository";

class UserUseCase {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepositoryPrisma();
  }

  async create({ name, email }: UserCreate): Promise<User> {
    const verifyIfUserExists = await this.userRepository.findUserByEmail(email);

    if (verifyIfUserExists) throw new Error("User already exists");

    const result = await this.userRepository.create({ email, name });

    return result;
  }

  async updateUser({ email, name, id }: UserUpdate): Promise<User> {
    const result = await this.userRepository.updateUser({
      id,
      email,
      name,
    });

    return result;
  }

  async getAllUsers(): Promise<User[]> {
    const result = await this.userRepository.getAllUsers();

    return result;
  }

  async findOneUser(id: User["id"]): Promise<User> {
    const user = await this.userRepository.findUserById(id);

    if (!user) throw new Error("User not found");

    return user;
  }

  async deleteUser(id: User["id"]): Promise<User> {
    const user = await this.userRepository.deleteUser(id);

    if (!user) throw new Error("User not found");

    return user;
  }
}

export { UserUseCase };
