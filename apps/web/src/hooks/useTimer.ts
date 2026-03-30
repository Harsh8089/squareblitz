import { useCallback, useEffect, useRef, useState } from 'react';

type UseTimerReturn = {
  time: number;
  isRunning: boolean;
  pause: () => void;
  resume: () => void;
  reset: () => void;
};

export const useTimer = (initialTime: number): UseTimerReturn => {
  const [time, setTime] = useState<number>(initialTime);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const pausedTimeRef = useRef<number>(initialTime);

  const startInterval = useCallback(() => {
    if (intervalRef.current) {
      return;
    }

    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, INTERVAL);
  }, []);

  const pause = useCallback(() => {
    if (!intervalRef.current) {
      return;
    }

    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsRunning(false);

    setTime((prev) => {
      pausedTimeRef.current = prev;
      return prev;
    });
  }, []);

  const resume = useCallback(() => {
    if (intervalRef.current || pausedTimeRef.current <= 0) {
      return;
    }

    setTime(pausedTimeRef.current);
    startInterval();
  }, [startInterval]);

  const reset = useCallback(() => {
    clearInterval(intervalRef.current!);

    intervalRef.current = null;
    pausedTimeRef.current = initialTime;

    setTime(initialTime);
    setIsRunning(false);

    startInterval();
  }, [initialTime]);

  useEffect(() => {
    startInterval();

    return () => {
      clearInterval(intervalRef.current!);
    };
  }, [startInterval]);

  return { time, isRunning, pause, resume, reset };
};

const INTERVAL = 1000;
