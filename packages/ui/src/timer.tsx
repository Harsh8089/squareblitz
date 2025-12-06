import { FC, useEffect, useMemo, useState } from "react";
import { mapSizeToPx } from "./utils";

type Prop = {
  endTime: 15 | 30 | 60,
  size: number,
}

export const Timer: FC<Prop> = ({
  endTime,
  size
}) => {
  const [timeRemaining, setTimeRemaining] = useState<number>(endTime);

  const squareSizePx = useMemo(() => mapSizeToPx(size) * size, [size]);

  useEffect(() => {
    const interval = setInterval(() => {
      if(timeRemaining <= 0) {
        return;
      }

      setTimeRemaining((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    }
  });

  const progressPercentage = (timeRemaining / endTime) * 100;

  return <div className="space-y-2"
    style={{
      width: squareSizePx
    }}
  >
    <div className="h-4 bg-brown-1 rounded-full overflow-hidden shadow-sm">
      <div
        className={`h-full transition-all duration-300 ${
          progressPercentage > 50
            ? 'bg-grain-2'
            : progressPercentage > 25
            ? 'bg-grain-1'
            : 'bg-brown-3'
        }`}
        style={{ width: `${Math.max(0, progressPercentage)}%` }}
      />
    </div>
    <p className="text-center text-brown-3 text-lg font-semibold">
      {Math.max(0, timeRemaining).toFixed(1)}s
    </p>
  </div>
}