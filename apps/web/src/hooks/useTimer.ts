import { useEffect, useState } from 'react';

export const useTimer = (time: number) => {
  const [timeRemaining, setTimeRemaining] = useState<number>(time);

  useEffect(() => {
    if (timeRemaining <= 0) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeRemaining]);

  return timeRemaining;
};
