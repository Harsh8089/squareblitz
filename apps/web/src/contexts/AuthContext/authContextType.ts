export type AuthContextType = {
  user?: User;
  login: (u?: User) => boolean;
  logout: () => void;
};

export type User = {
  username: string;
  email: string;
}