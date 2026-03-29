import { Dot } from 'recharts';

export const CustomDot = (props: any) => {
  const { cx, cy, payload } = props;
  return (
    <Dot
      cx={cx}
      cy={cy}
      r={3}
      fill={payload.isCorrect ? '#e2b714' : '#ca4754'}
      stroke="transparent"
    />
  );
};
