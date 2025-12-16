import { User } from "@repo/types/user";
import { ResponseType } from "../types";

export type AuthContextType = { 
  signup: (u: User) => Promise<ResponseType>;
  signin: (u: Omit<User, "email">) => Promise<ResponseType>;
  logout: () => Promise<ResponseType>;
};