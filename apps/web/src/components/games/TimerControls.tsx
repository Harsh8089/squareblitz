import { useGameSession } from '../../contexts';
import { ResetButton } from './ResetButton';
import { PauseButton } from './PauseButton';
import { mapSizeToPx } from '../../utils';
import { FC, useMemo } from 'react';

export const TimerControls: FC = () => {
  const { filter, pause, resume, reset, isRunning } = useGameSession();

  const size = filter?.size!;

  const squareSizePx = useMemo(() => mapSizeToPx(size) * size, [size]);

  if (!size) {
    return null;
  }

  return (
    <div
      style={{
        width: squareSizePx,
      }}
      className="flex gap-2 mt-2"
    >
      <PauseButton
        pause={pause}
        resume={resume}
        isRunning={isRunning}
      />
      <ResetButton resetTimer={reset} />
    </div>
  );
};
