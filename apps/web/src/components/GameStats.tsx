import { LineChart, Line, YAxis, Tooltip, Dot } from 'recharts';
import { ChartContainer, ChartConfig } from '@repo/ui/shadcn/chart';
import { Navigate, useLocation } from 'react-router-dom';
import { useStats } from '../hooks';
import { URL } from '../utils';
import { FC } from 'react';

const chartConfig = {
  timeTaken: {
    label: 'Time Taken',
    color: '#af5f5f',
  },
} satisfies ChartConfig;

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;

  const entry = payload[0];
  const m = entry.payload;

  return (
    <div className="bg-brown-3 rounded-md border px-3 py-2 text-sm shadow-sm">
      <span className="text-brown-1 font-extrabold">
        {m.timeTaken.toFixed(2)} s
      </span>
    </div>
  );
};

const CustomDot = (props: any) => {
  const { cx, cy, payload } = props;
  return (
    <Dot
      cx={cx}
      cy={cy}
      r={5}
      fill={payload.isCorrect ? '#22c55e' : '#ef4444'}
      stroke={payload.isCorrect ? '#16a34a' : '#dc2626'}
      strokeWidth={2}
    />
  );
};

export const GameStats: FC = () => {
  const { search } = useLocation();
  const id = new URLSearchParams(search).get('id');

  if (!id) {
    return <Navigate to={`/${URL.GAME}/${URL.SETUP}`} />;
  }

  const { data: gameStats, isFetching } = useStats(id);

  if (isFetching) {
    return <div>Loading...</div>;
  }

  const moves = gameStats?.data?.moves ?? [];

  return (
    <div className="p-6">
      <ChartContainer config={chartConfig} className="h-72 w-full">
        <LineChart
          data={moves}
          margin={{ top: 8, right: 16, bottom: 8, left: 0 }}
        >
          <YAxis
            label={{
              value: 'time (s)',
              angle: -90,
              position: 'insideLeft',
              fontSize: 12,
            }}
            tickFormatter={(v) => `${v.toFixed(1)}s`}
            tick={{ fontSize: 12, fill: '#703b3b' }}
            stroke="rgba(187,168,136,0.25)"
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="timeTaken"
            stroke="#af5f5f"
            strokeWidth={2}
            dot={<CustomDot />}
            activeDot={{ r: 8, fill: '#af5f5f' }}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
};
