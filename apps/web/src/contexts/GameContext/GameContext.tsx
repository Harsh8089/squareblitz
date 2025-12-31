import { createContext, FC, ReactNode, useContext, useState } from 'react';
import { GameMode, GameState, GameStatus } from '@repo/types/game';
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
    filter: {
      size: 8,
      mode: GameMode.BLIND,
      timer: '15',
    },
  });

  const start = async (): Promise<ResponseType> => {
    const token = localStorage.getItem('token');

    if (!token) {
      return {
        success: false,
        error: 'Token not found',
      };
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
          Authorization: `Bearer ${token}`,
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
    const token = localStorage.getItem('token');

    if (!token) {
      return {
        success: false,
        error: 'Token not found',
      };
    }

    try {
      const response = await axios.get('http://localhost:8000/api/game/send', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.data.success) {
        return {
          success: false,
          error: 'Failed to send target',
        };
      }

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

  const end = (): boolean => {
    return true;
  };

  const verify = async (
    timeTaken: number,
    target: SquareType,
  ): Promise<ResponseType> => {
    const token = localStorage.getItem('token');

    if (!token) {
      return {
        success: false,
        error: 'Token not found',
      };
    }

    try {
      const response = await axios.post(
        'http://localhost:8000/api/game/verify',
        {
          timeTaken,
          target,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.data.success) {
        if (!response.data.success) {
          return {
            success: false,
            error: 'Failed to verify game',
          };
        }
      }

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
