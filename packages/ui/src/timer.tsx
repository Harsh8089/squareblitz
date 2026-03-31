import { FC, ReactElement, useMemo } from 'react';

type Prop = {
  timeRemaining: number;
  icon: ReactElement;
};

export const Timer: FC<Prop> = ({ timeRemaining, icon }) => {
  const formattedTime = useMemo(
    () => formatTime(timeRemaining),
    [timeRemaining],
  );
  const isLow = timeRemaining <= 10;

  const [minutes, seconds] = formattedTime.split(':');

  return (
    <div
      className={`p-10 rounded-2xl h-32 flex flex-1 flex-col justify-center items-center gap-2
      border transition-colors duration-500
      ${
        isLow
          ? 'bg-wrong-1/25 border-wrong-2/50'
          : 'bg-brown-2/20 border-brown-2/40'
      }`}
    >
      <p
        className={`transition-colors duration-500 ${isLow ? 'text-wrong-2' : 'text-grain-1'}`}
      >
        {icon}
      </p>
      <p
        className={`font-light text-4xl tracking-wide transition-colors duration-500
        ${isLow ? 'text-wrong-2' : 'text-grain-3'}`}
      >
        {minutes}
        <span className={`${isLow ? 'text-wrong-3/40' : 'text-grain-1/40'}`}>
          :
        </span>
        {seconds}
        <span
          className={`text-base ml-0.5 ${isLow ? 'text-wrong-2' : 'text-grain-1'}`}
        >
          s
        </span>
      </p>
      <p
        className={`text-[10px] uppercase tracking-widest transition-colors duration-500
        ${isLow ? 'text-wrong-2' : 'text-grain-1/80'}`}
      >
        remaining
      </p>
    </div>
  );
};

const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};
