import { BoardSize } from "@repo/types/board";

export type Timer = '15' | '30' | '60';

export enum GameMode {
  ASSISTED = "assisted",   // Highlights rank + file + flashes square
  BLIND = "blind",         // Only shows rank + file, no square highlight
};

export type Game = {
  mode: GameMode;
  timer: Timer;
  size: BoardSize;
  correct: 0;
  total: 0;
  timeTaken: number[];
};

export type Filter = {
  mode?: GameMode;
  timer?: Timer;
}

export type GameContextType = {
  setHistory: (g: Game) => Game | undefined;
  getHistory: (f?: Filter) => Game[];
};

