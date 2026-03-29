import { FC } from 'react';

export const CustomTooltip: FC<any> = ({ active, payload, label }) => {
  if (!active || !payload?.length) {
    return null;
  }

  const d = payload[0].payload;

  return (
    <div className="bg-brown-1 border-brown-2 border rounded-md px-3 py-2 text-md min-w-[130px] flex flex-col gap-1">
      <p className="text-lg font-extrabold text-grain-2">{label}</p>
      <p className="text-md font-semibold flex gap-2 text-grain-1">
        time {d.timeTaken}s
      </p>
      <p
        className={`${d.isCorrect ? 'text-[#9ece6a]' : 'text-[#ca4754]'} text-md font-semibold`}
      >
        {d.isCorrect ? 'correct' : 'incorrect'}
      </p>
    </div>
  );
};
