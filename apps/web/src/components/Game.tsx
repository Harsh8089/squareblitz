import { Board } from "@repo/ui/board";
import { Timer } from "@repo/ui/timer";
import { FC } from "react";

export const Game: FC = () => {
  const size = 4;

  return <div className="w-screen h-screen grid grid-cols-[3fr_2fr]">
    <div className="w-full h-full flex flex-col justify-center items-center">
      <Board size={size} />
      <Timer 
        endTime={15} 
        size={size} 
      />
    </div>
    <div className="w-full h-full flex flex-col items-center justify-center">
    </div>
  </div>
}