import { Check, X } from "lucide-react";
import { FC, ReactElement } from "react";
import { Timer } from "@repo/ui/timer";

type Prop = {
  score: {
    correct: number,
    total: number,
  }
}

export const ScorePanel: FC<Prop> = ({
  score
}) => <div className="flex flex-col items-center bg-brown-2 h-full w-[50%] rounded-2xl">
  <div className="flex items-center justify-evenly bg-grain-1 w-full h-48">
    <Score 
      Icon={<Check size={48} color="#3a1d1d" />}
      metric={score.correct}
    />
    <Score 
      Icon={<X size={48} color="#3a1d1d" />}
      metric={score.total - score.correct}
    />
  </div>
  <Timer endTime={15} />
</div>

const Score = ({ Icon, metric }: {
  Icon: ReactElement,
  metric: number
}) => <div className="flex flex-col items-center gap-2">
  {Icon}
  <p className="font-bold text-brown-1 text-4xl">
    {metric}
  </p>
</div>
