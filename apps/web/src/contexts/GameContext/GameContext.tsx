import { 
  createContext, 
  FC, 
  ReactNode, 
  useContext, 
  useRef, 
  useState 
} from "react";
import { GameContextType, StartState } from "./gameContextType";
import { BoardSize } from "@repo/types/board";
import { 
  GameMode,
  GameState, 
  GameStatus, 
  Timer
} from "@repo/types/game";
import { SquareType } from "@repo/types/square";

type Prop = {
  children: ReactNode;
};

const GameContext = createContext<GameContextType | undefined>(undefined); 

export const GameProvider: FC<Prop> = ({ children }) => {
  const gameState = useRef<GameState>(undefined);

  const start = (state: StartState) => {
    // make api call to start
  }

  const end = (): boolean => {
    // make api call to save game 
    return true;
  }

  const handleSquareClick = (
    timeTaken: number, 
    target: SquareType
  ): boolean => {
    // api call to BE to verify 

    return true; 
  }

  return <GameContext.Provider value={{ start, end, handleSquareClick }}>
    { children }
  </GameContext.Provider>
}

export const useGame = () => useContext(GameContext);