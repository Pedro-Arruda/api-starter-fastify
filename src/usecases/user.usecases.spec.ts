import { UserCreate } from "../interfaces/user.interface";
import { UserUseCase } from "./user.usecases";

describe("Create user", () => {
  it("Should be able to create a new user", async () => {
    const userUserCase = new UserUseCase();

    const userData: UserCreate = { email: "test@test.com", name: "Test" };

    const user = await userUserCase.create(userData);

    console.log(user);

    expect(user).toHaveProperty("id");
  });
});
