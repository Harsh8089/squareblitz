import { FC } from 'react';

type Prop = {
  timeRemaining: number;
};

export const Timer: FC<Prop> = ({ timeRemaining }) => (
  <div className="bg-brown-1 w-full h-32 flex justify-center items-center">
    <p className="text-grain-3 font-md text-4xl">{formatTime(timeRemaining)}</p>
  </div>
);

const formatTime = (time: number) => {
  if (time === 60) {
    return '01:00';
  }

  if (time < 10) {
    return `00:0${time}`;
  }

  return `00:${time}`;
};
