import { Board } from "@repo/ui/board";
import { Timer } from "@repo/ui/timer";
import { FC } from "react";

export const Game: FC = () => {
  
  return <div className="flex flex-col justify-center items-center">
    <Board size={8} />
    <Timer 
      endTime={15} 
      size={8} 
    />
  </div>
}