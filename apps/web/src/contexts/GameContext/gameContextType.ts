import { BoardSize } from "@repo/types/board";
import { 
  GameMode, 
  GameStatus, 
  Timer
} from "@repo/types/game";
import { SquareType } from "@repo/types/square";

export type Filter = {
  mode?: GameMode;
  timer?: Timer;
}

export type StartState = {
  endTime: Timer,
  mode: GameMode, 
  size: BoardSize
}

export type GameContextType = {
  start: (s: StartState) => void;
  end: () => boolean;
  handleSquareClick: 
    (timeTaken: number, t: SquareType) => boolean;
};

