import { User } from "@repo/types/user";
import { ResponseType } from "../types";

export type AuthContextType = { 
  login: (u: User) => Promise<ResponseType>;
  logout: () => Promise<ResponseType>;
};