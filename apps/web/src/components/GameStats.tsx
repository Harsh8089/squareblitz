import { Navigate, useLocation } from 'react-router-dom';
import { Chart, ChartLegend } from './charts';
import { NotFound } from '@repo/ui/notFound';
import { useStats } from '../hooks';
import { URL } from '../utils';
import { FC } from 'react';

type StatCardProps = {
  title: string;
  value?: string | number;
  suffix?: string;
  size?: 'lg' | 'sm';
};

export const GameStats: FC = () => {
  const { search } = useLocation();
  const id = new URLSearchParams(search).get('id');

  const { data: gameStats, isFetching, error } = useStats(id ?? '');

  if (!id) {
    return <Navigate to={`/${URL.GAME}/${URL.SETUP}`} />;
  }

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <NotFound />;
  }

  const {
    moves,
    avgTimeTaken: avg,
    mpm,
    accuracy,
    best,
    worst,
    streak,
    timer,
  } = gameStats?.data ?? {};

  const bottomStats: StatCardProps[] = [
    { title: 'best', value: best, suffix: 's' },
    { title: 'worst', value: worst, suffix: 's' },
    { title: 'streak', value: streak },
    { title: 'time', value: timer, suffix: 's' },
  ];

  return (
    <div className="w-[90%] mx-auto px-10 flex flex-1 justify-between items-center">
      <div className="w-[15%] h-96 flex flex-col gap-10">
        <StatCard title="mpm" value={mpm} size="lg" />
        <StatCard
          title="acc"
          value={accuracy?.toFixed(0)}
          suffix="%"
          size="lg"
        />
      </div>
      <div className="w-[85%] h-96 flex flex-col">
        <Chart moves={moves} avg={avg} />
        <ChartLegend />
        <div className="h-[30%] w-full flex gap-48">
          {bottomStats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </div>
      </div>
    </div>
  );
};

const StatCard: FC<StatCardProps> = ({
  title,
  value = '-',
  suffix,
  size = 'sm',
}) => (
  <div className="flex flex-col justify-center">
    <p
      className={`text-brown-3 tracking-normal font-extrabold ${size === 'lg' ? 'text-4xl' : 'text-2xl'}`}
    >
      {title}
    </p>
    <p
      className={`text-grain-2 font-light ${size === 'lg' ? 'text-7xl' : 'text-3xl'}`}
    >
      {value}
      {suffix && (
        <span className={size === 'lg' ? 'text-5xl' : 'text-xl'}>{suffix}</span>
      )}
    </p>
  </div>
);
