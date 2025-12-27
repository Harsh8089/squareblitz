import { FC, ReactElement, useMemo, useState } from 'react';
import { GameMode } from '@repo/types/game';

type Props = {
  width?: string;
  icons: ReactElement[];
};

const BASE_STYLE =
  'rounded-full text-2xl h-full flex items-center justify-center cursor-pointer';

const variants = {
  primary: 'text-grain-1',
  secondary: 'bg-grain-2 text-brown-1 font-bold',
};

export const Toggle: FC<Props> = ({ width = '550px', icons }) => {
  const [selected, setSelected] = useState<GameMode>(GameMode.BLIND);

  const variantWidth = useMemo(
    () => Math.trunc(Number(width.slice(0, -2)) / 2).toString() + 'px',
    [width],
  );

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="text-grain-2">
        {icons[selected === GameMode.BLIND ? 0 : 1]}
      </div>
      <div
        className="flex items-center gap-2 border border-grain-1 rounded-full h-32 p-2"
        style={{ width }}
      >
        <div
          className={`${selected === GameMode.BLIND ? variants.secondary : variants.primary} ${BASE_STYLE}`}
          style={{ width: variantWidth }}
          onClick={() => setSelected(GameMode.BLIND)}
        >
          {capitalizeFirstLetter(GameMode.BLIND)}
        </div>
        <div
          className={`${selected === GameMode.ASSISTED ? variants.secondary : variants.primary} ${BASE_STYLE}`}
          style={{ width: variantWidth }}
          onClick={() => setSelected(GameMode.ASSISTED)}
        >
          {capitalizeFirstLetter(GameMode.ASSISTED)}
        </div>
      </div>
    </div>
  );
};

const capitalizeFirstLetter = (letter: string) =>
  letter.charAt(0).toUpperCase() + letter.slice(1);
