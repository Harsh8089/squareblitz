import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { BoardSize, GameMode, GameState } from '@repo/types/game';

type Prop = {
  children: ReactNode;
};

type GameContextType = {
  gameState: GameState;
  setGameState: Dispatch<SetStateAction<GameState>>;
};

export const DEFAULT_GAME_STATE: GameState = {
  id: null,
  status: null,
  filter: {
    size: 4 as BoardSize,
    mode: GameMode.BLIND,
    timer: '15',
  },
  moves: [],
};

const GameContext = createContext<GameContextType>({
  gameState: DEFAULT_GAME_STATE,
  setGameState: () => {},
});

export const GameProvider: FC<Prop> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>(DEFAULT_GAME_STATE);

  return (
    <GameContext.Provider
      value={{
        gameState,
        setGameState,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }

  return context;
};
