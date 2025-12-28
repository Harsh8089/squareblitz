import { FC, ReactElement, useMemo, useState, cloneElement } from 'react';
import { GameMode } from '@repo/types/game';

type IconProps = {
  size?: number;
  [key: string]: any;
};

type Props = {
  variant?: 'large' | 'small';
  icons: ReactElement<IconProps>[];
  onChange?: (v: GameMode) => void;
};

export const Toggle: FC<Props> = ({ variant = 'small', icons, onChange }) => {
  const [selected, setSelected] = useState<GameMode>(GameMode.BLIND);

  const handleClick = (v: GameMode) => {
    setSelected(v);
    onChange?.(v);
  };

  const iconSize = variant === 'large' ? 30 : 30;

  const icon = icons[selected === GameMode.BLIND ? 0 : 1];
  const clonedIcon = icon ? cloneElement(icon, { size: iconSize }) : null;

  return (
    <div className="flex flex-col items-center gap-3 sm:gap-5 w-full max-w-[90vw] px-4">
      <div className="text-grain-2">{clonedIcon}</div>
      <div
        className={`flex items-center gap-1 max-w-[480px] sm:gap-2 border border-grain-1 rounded-full p-1.5 sm:p-2 w-full ${
          variant === 'large' ? 'h-28' : 'h-20'
        }`}
      >
        <div
          className={`${
            selected === GameMode.BLIND ? variants.secondary : variants.primary
          } ${BASE_STYLE}`}
          onClick={() => handleClick(GameMode.BLIND)}
        >
          {capitalizeFirstLetter(GameMode.BLIND)}
        </div>
        <div
          className={`${
            selected === GameMode.ASSISTED
              ? variants.secondary
              : variants.primary
          } ${BASE_STYLE}`}
          onClick={() => handleClick(GameMode.ASSISTED)}
        >
          {capitalizeFirstLetter(GameMode.ASSISTED)}
        </div>
      </div>
    </div>
  );
};

const capitalizeFirstLetter = (letter: string) =>
  letter.charAt(0).toUpperCase() + letter.slice(1);

const BASE_STYLE =
  'rounded-full text-sm sm:text-base md:text-lg lg:text-xl h-full flex-1 flex items-center justify-center cursor-pointer transition-all';

const variants = {
  primary: 'text-grain-1',
  secondary: 'bg-grain-2 text-brown-1 font-bold',
};
