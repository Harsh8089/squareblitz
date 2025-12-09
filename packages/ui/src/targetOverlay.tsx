import { SquareType } from "@repo/types/square";
import { FC } from "react";

type Prop = {
  currentTarget: SquareType
};

export const TargetOverlay: FC<Prop> = ({
  currentTarget
}) => <div className="absolute inset-0 flex items-center justify-center 
    pointer-events-none"
  >
  <div className="text-brown-1 text-7xl font-bold px-8 py-4 rounded-2xl shadow-2xl"
    style={style}
  >
    {currentTarget.file}{currentTarget.rank}
  </div>
</div>

const style = {
  WebkitTextStroke: '7px #eae1d3',
  paintOrder: 'stroke fill'
}