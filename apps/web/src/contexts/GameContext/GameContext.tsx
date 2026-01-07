import { GameFilter, GameMode, GameState, GameStatus } from '@repo/types/game';
import { createContext, FC, ReactNode, useContext, useState } from 'react';
import { GameContextType } from './gameContextType';
import { SquareType } from '@repo/types/square';
import { ResponseType } from '../types';
import axios from 'axios';

type Prop = {
  children: ReactNode;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: FC<Prop> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>({
    filter: DEFAULT_FILTER_STATE,
  });

  const getToken = () => {
    const token = localStorage.getItem('token');

    if (!token) {
      return {
        success: false,
        error: 'Token not found',
      };
    }

    return {
      success: true,
      token,
    };
  };

  const start = async (): Promise<ResponseType> => {
    const tokenData = getToken();

    if (!tokenData.success) {
      return tokenData;
    }

    if (!gameState?.filter) {
      return new Promise((_, rej) =>
        rej({
          success: false,
          message: 'Missing game state filter',
        }),
      );
    }

    const { size, mode, timer } = gameState.filter;

    try {
      const response = await axios.get(`http://localhost:8000/api/game/start`, {
        headers: {
          Authorization: `Bearer ${tokenData.token}`,
        },
        params: {
          size,
          mode,
          timer,
        },
      });

      if (!response.data.success) {
        return {
          success: false,
          error: 'Failed to start game',
        };
      }

      setGameState({
        status: GameStatus.START,
        filter: gameState.filter,
        correct: 0,
        total: 0,
      });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Something went wrong to start game',
      };
    }
  };

  const send = async (): Promise<ResponseType> => {
    const tokenData = getToken();

    if (!tokenData.success) {
      return tokenData;
    }

    try {
      const response = await axios.get('http://localhost:8000/api/game/send', {
        headers: {
          Authorization: `Bearer ${tokenData.token}`,
        },
      });

      if (!response.data.success) {
        return {
          success: false,
          error: 'Failed to send target',
        };
      }

      const currentTarget = response.data.data.target;
      setGameState((prev) => ({
        ...prev,
        currentTarget,
      }));

      return {
        success: true,
        data: response.data.data,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Something went wrong to start game',
      };
    }
  };

  const verify = async (target: SquareType): Promise<ResponseType> => {
    const tokenData = getToken();

    if (!tokenData.success) {
      return tokenData;
    }

    try {
      const response = await axios.post(
        'http://localhost:8000/api/game/verify',
        {
          target,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenData.token}`,
          },
        },
      );

      if (!response.data.success) {
        return {
          success: false,
          error: response.data.data.message,
        };
      }

      const { correct, total, timeTaken, lastMoveCorrect } = response.data.data;

      setGameState((prev) => ({
        ...prev,
        correct,
        total,
        lastMoveCorrect,
        timeTaken: [...(prev.timeTaken ?? []), timeTaken],
      }));

      return {
        success: true,
        statusCode: response.status,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Something went wrong to verify game',
      };
    }
  };

  const end = async (): Promise<ResponseType> => {
    const tokenData = getToken();

    if (!tokenData.success) {
      return tokenData;
    }

    try {
      const response = await axios.post(
        'http://localhost:8000/api/game/end',
        {},
        {
          headers: {
            Authorization: `Bearer ${tokenData.token}`,
          },
        },
      );

      setGameState({
        status: GameStatus.END,
        filter: DEFAULT_FILTER_STATE,
      });

      if (!response.data.success) {
        return {
          success: false,
          error: 'Failed to start game',
        };
      }

      return {
        success: true,
        statusCode: response.status,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Something went wrong to end game',
      };
    }
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        setGameState,
        start,
        end,
        send,
        verify,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error('gameContext must be used within GameProvider');
  }

  return context;
};

const DEFAULT_FILTER_STATE: GameFilter = {
  size: 4,
  mode: GameMode.BLIND,
  timer: '15',
};
