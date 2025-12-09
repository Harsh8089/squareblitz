import { User } from "@repo/types/user";

export type AuthContextType = {
  user?: User;
  login: (u?: User) => boolean;
  logout: () => void;
};