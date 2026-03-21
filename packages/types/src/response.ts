import { GameState, Move } from "./game";

export type Response<T> = {
  success: boolean;
  message?: string;
  data?: T
};

export type AuthData = {
  id?: string;
  user?: string;
  accessToken?: string;
};

export interface GameData extends GameState {
  target?: Move,
  move?: Move
};