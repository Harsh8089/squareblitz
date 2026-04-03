import { useReset } from '../../hooks/useGameMutations';
import { useGameSession } from '../../contexts';
import { Button } from '@repo/ui/button';
import { RefreshCw } from 'lucide-react';
import { FC, useCallback } from 'react';

type Props = {
  resetTimer: () => void;
};

export const ResetButton: FC<Props> = ({ resetTimer }) => {
  const { mutateAsync: reset } = useReset();

  const { size, mode, timer } = useGameSession().filter;

  const handleReset = useCallback(async () => {
    if (!size || !mode || !timer) {
      return;
    }

    await reset({ size, mode, timer });

    resetTimer();
  }, [size, mode, timer, reset, resetTimer]);

  return (
    <Button
      onClick={handleReset}
      icon={<RefreshCw />}
      className="flex justify-center items-center"
      variant="outline"
    />
  );
};
