import { TimerBar as TimerBarUI } from '@repo/ui/timerBar';
import { useGameSession } from '../../contexts';
import { FC } from 'react';

export const TimerBar: FC = () => {
  const { time, timer, size } = useGameSession();

  return <TimerBarUI timeRemaining={time} timer={timer} size={size} />;
};
