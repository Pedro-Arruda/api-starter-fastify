import { UserRepositoryInMemory } from "../../repositories/in-memory/user.repositoryInMemory";
import { UserService } from "./auth.service";
import { UserCreate, UserRepository } from "../../interfaces/user.interface";

describe("User", () => {
  let userRepository: UserRepository;
  let userService: UserService;

  beforeAll(() => {
    userRepository = new UserRepositoryInMemory();
    userService = new UserService(userRepository);
  });

  it("Should be able to create user", async () => {
    const userData: UserCreate = {
      name: "Test Name",
      email: "test@email.com",
    };

    const user = await userService.create(userData);

    expect(user).toHaveProperty("id");
    expect(user.email).toBe(userData.email);
  });

  it("Should not be able to create an existing user", async () => {
    const userData: UserCreate = {
      name: "Test Existing Name",
      email: "testexisting@email.com",
    };

    await userService.create(userData);

    await expect(userService.create(userData)).rejects.toEqual(
      new Error("User already exists")
    );
  });
});
