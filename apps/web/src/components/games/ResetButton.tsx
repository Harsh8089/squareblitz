import { Button } from '@repo/ui/button';
import { RefreshCw } from 'lucide-react';
import { FC } from 'react';

type Props = {
  reset: () => void;
};

export const ResetButton: FC<Props> = ({ reset }) => {
  return (
    <Button
      onClick={reset}
      icon={<RefreshCw />}
      className="flex justify-center items-center"
      variant="outline"
    />
  );
};
