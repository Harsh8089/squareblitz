import { 
  GameMode, 
  Timer
} from "@repo/types/game";
import { SquareType } from "@repo/types/square";
import { ResponseType } from "../types";
import { BoardSize } from "@repo/types/board";

export type Filter = {
  mode?: GameMode;
  timer?: Timer;
}

export type GameContextType = {
  start: 
    (size: BoardSize, mode: GameMode, timer: Timer) => Promise<ResponseType>;
  end: () => boolean;
  send: (size: BoardSize) => Promise<ResponseType>;
  verify: 
    (timeTaken: number, t: SquareType) => Promise<ResponseType>;
};