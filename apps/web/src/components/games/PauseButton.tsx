import { Pause, Play } from 'lucide-react';
import { Button } from '@repo/ui/button';
import { FC, useMemo } from 'react';

type Props = {
  pause: () => void;
  resume: () => void;
  isRunning: boolean;
};

export const PauseButton: FC<Props> = ({ pause, resume, isRunning }) => {
  const { icon, action } = useMemo(
    () => ({
      icon: isRunning ? <Pause size={25} /> : <Play size={25} />,
      action: isRunning ? pause : resume,
    }),
    [isRunning],
  );

  return (
    <Button
      onClick={action}
      icon={icon}
      className="flex justify-center items-center"
      variant="outline"
    />
  );
};
