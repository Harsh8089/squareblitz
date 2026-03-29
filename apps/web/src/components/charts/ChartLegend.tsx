import { FC } from 'react';

export const ChartLegend: FC = () => {
  return (
    <div className="ml-auto flex gap-4 mt-3 text-[11px] text-grain-1">
      {CHART_LEGEND.map((i) => (
        <span key={i.title} className="flex items-center gap-1.5">
          <span className={i.style} />
          <span>{i.title}</span>
        </span>
      ))}
    </div>
  );
};

const CHART_LEGEND: {
  title: string;
  style: string;
}[] = [
  {
    title: 'correct',
    style: 'w-2 h-2 rounded-full bg-[#e2b714] inline-block',
  },
  {
    title: 'incorrect',
    style: 'w-2 h-2 rounded-full bg-[#ca4754] inline-block',
  },
  {
    title: 'avg',
    style: 'w-4 border-t border-dashed border-brown-3 inline-block',
  },
];
