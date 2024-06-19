import { User } from "@prisma/client";

import { z } from "zod";

export const AuthSignInSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const AuthAccessTokenSchema = z.object({
  refreshToken: z.string(),
});

export const AuthSignInResponseSchema = z.object({
  user: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
  accessToken: z.string(),
  refreshToken: z.string(),
});

export type AuthSignIn = z.infer<typeof AuthSignInSchema>;

export type AuthSignInResponse = z.infer<typeof AuthSignInResponseSchema>;

export interface AuthJWTToken {
  userId: number;
  iat: number;
  exp: number;
  sub: string;
}

export interface AuthRepository {
  findUserByEmail(email: string): Promise<User | null>;
}
