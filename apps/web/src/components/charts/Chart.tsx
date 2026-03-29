import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  XAxis,
  YAxis,
} from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from '@repo/ui/shadcn/chart';
import { CustomTooltip } from './CustomToolTip';
import { Move } from '@repo/types/game';
import { CustomDot } from './CustomDot';
import { FC } from 'react';

type Props = {
  moves?: Move[];
  avg?: number;
};

export const Chart: FC<Props> = ({ moves, avg }) => {
  return (
    <ChartContainer config={chartConfig} className="h-[70%] w-full">
      <LineChart
        data={moves}
        margin={{ top: 8, right: 16, bottom: 8, left: 0 }}
      >
        <CartesianGrid
          vertical={false}
          stroke="rgba(187,168,136,0.2)"
          strokeDasharray="5 5"
        />
        <XAxis
          dataKey="id"
          axisLine={false}
          tickLine={false}
          tick={{
            fontSize: 11,
            fill: '#af5f5f',
            fontFamily: "'Roboto Mono', monospace",
          }}
          label={{
            value: 'move #',
            position: 'insideBottom',
            offset: -2,
            fontSize: 13,
            fill: '#af5f5f',
          }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `${v}s`}
          tick={{ fontSize: 11, fill: '#af5f5f' }}
          width={42}
        />
        <ReferenceLine
          y={avg}
          stroke="#af5f5f"
          strokeDasharray="4 4"
          label={{
            value: `${avg ?? '-'}s`,
            position: 'insideTopRight',
            fontSize: 13,
            fill: '#af5f5f',
          }}
        />
        <ChartTooltip
          content={<CustomTooltip />}
          cursor={{
            stroke: '#af5f5f',
            strokeWidth: 2,
            strokeDasharray: '3 3',
          }}
        />
        <Line
          type="monotone"
          dataKey="timeTaken"
          stroke="#af5f5f"
          strokeWidth={4}
          dot={<CustomDot />}
          activeDot={{ r: 3, fill: '#3a1d1d', strokeWidth: 2 }}
        />
      </LineChart>
    </ChartContainer>
  );
};

const chartConfig = {
  timeTaken: {
    label: 'Time Taken',
    color: '#af5f5f',
  },
} satisfies ChartConfig;
