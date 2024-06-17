import { User } from "@prisma/client";
import {
  UserCreateInputSchema,
  UserUpdateInputSchema,
} from "../../prisma/generated/zod";
import { z } from "zod";

export const UserCreateSchema = UserCreateInputSchema;
export type UserCreate = z.infer<typeof UserCreateSchema>;

export const UserUpdateSchema = UserUpdateInputSchema;
export type UserUpdate = z.infer<typeof UserUpdateSchema> & {
  id: number;
};

export interface UserRepository {
  create(data: UserCreate): Promise<User>;
  getAllUsers(): Promise<User[]>;
  findUserById(id: number): Promise<User | null>;
  findUserByEmail(email: string): Promise<User | null>;
  updateUser(data: UserUpdate): Promise<User>;
  deleteUser(id: number): Promise<User | null>;
}
