import { compare } from "bcryptjs";
import {
  AuthJWTToken,
  AuthRepository,
  AuthSignIn,
  AuthSignInResponse,
} from "../../interfaces/auth.interface";
import { sign, verify } from "jsonwebtoken";

class AuthService {
  private authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  async signIn({ email, password }: AuthSignIn): Promise<AuthSignInResponse> {
    const userAlreadyExists = await this.authRepository.findUserByEmail(email);

    if (!userAlreadyExists) throw new Error("User or password incorrect");

    const passwordMatch = await compare(password, userAlreadyExists.password);

    if (!passwordMatch) throw new Error("User or password incorrect");

    const { password: userPassword, ...userWithoutPassword } =
      userAlreadyExists;

    const accessToken = sign({}, "551f1009-fa1e-438d-a4c8-7d442e9e593d", {
      subject: String(userAlreadyExists.id),
      expiresIn: "5m",
    });

    const refreshToken = sign(
      { userId: userAlreadyExists.id },
      "551f1009-fa1e-438d-a4c8-7d442e9e593d",
      {
        subject: String(userAlreadyExists.id),
        expiresIn: "7d",
      }
    );

    return { user: userWithoutPassword, accessToken, refreshToken };
  }

  async generateAccessToken(refreshToken: string): Promise<any> {
    const decoded = verify(
      refreshToken,
      "551f1009-fa1e-438d-a4c8-7d442e9e593d"
    );

    if (!decoded) throw new Error("Refresh token invalid");

    const { userId } = decoded as AuthJWTToken;

    const accessToken = sign(
      { userId },
      "551f1009-fa1e-438d-a4c8-7d442e9e593d",
      {
        expiresIn: "30m",
      }
    );

    return { accessToken };
  }
}

export { AuthService };
