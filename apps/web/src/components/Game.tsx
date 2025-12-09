import { TimerBar } from "@repo/ui/timerBar";
import { FC } from "react";
import { ScorePanel } from "./ScorePanel";
import { Board } from "./Board";

export const Game: FC = () => {
  const size = 4;
  const score = {
    correct: 2,
    total: 3
  };

  return (
    <div className="w-screen h-screen grid grid-cols-[2fr_2fr]">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <Board size={size} />
        <TimerBar endTime={15} size={size} />
      </div>
      <div className="w-full my-5">
        <ScorePanel score={score} />
      </div>
    </div>
  );
};
