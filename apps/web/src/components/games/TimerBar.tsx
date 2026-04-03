import { TimerBar as TimerBarUI } from '@repo/ui/timerBar';
import { useGameSession } from '../../contexts';
import { FC } from 'react';

export const TimerBar: FC = () => {
  const { time, filter } = useGameSession();

  return (
    <TimerBarUI
      timeRemaining={time}
      filter={filter}
    />
  );
};
