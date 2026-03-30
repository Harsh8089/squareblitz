import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BoardSize, Timer } from '@repo/types/game';
import { useGame } from './GameProvider';
import { useTimer } from '../hooks';
import { URL } from '../utils';

type Prop = {
  children: ReactNode;
};

interface GameSessionContextValue {
  size: BoardSize;
  timer: Timer;
  time: number;
  pause: () => void;
  reset: () => void;
  resume: () => void;
  isRunning: boolean;
  gameId: string;
}

const GameSessionContext = createContext<GameSessionContextValue | null>(null);

export const GameSessionProvider: FC<Prop> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { gameState } = useGame();

  const { size, timer } = gameState?.filter ?? {};

  const timerDuration = useMemo(() => parseInt(timer ?? '0', 10), [timer]);
  const { time, pause, reset, resume, isRunning } = useTimer(timerDuration);

  const isValidSession = Boolean(size && timer && location.state?.autoStart);
  const isTimeUp = isValidSession && !time;

  useEffect(() => {
    if (!isValidSession) {
      navigate(`/${URL.GAME}/${URL.SETUP}`);
    }
  }, [isValidSession, navigate]);

  useEffect(() => {
    if (isTimeUp) {
      navigate(`/${URL.GAME}/${URL.STATS}?id=${gameState?.id}`);
    }
  }, [isTimeUp, navigate, gameState?.id]);

  const value = useMemo(
    () => ({
      size: size as BoardSize,
      timer: timer as Timer,
      time,
      pause,
      reset,
      resume,
      isRunning,
      gameId: gameState?.id ?? '',
    }),
    [size, timer, time, pause, reset, resume, isRunning, gameState?.id],
  );

  if (!isValidSession || isTimeUp) {
    return null;
  }

  return (
    <GameSessionContext.Provider value={value}>
      {children}
    </GameSessionContext.Provider>
  );
};

export const useGameSession = () => {
  const ctx = useContext(GameSessionContext);

  if (!ctx) {
    throw new Error('useGameSession must be used within GameSessionProvider');
  }

  return ctx;
};
