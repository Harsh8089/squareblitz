import { BoardType } from "@repo/types/board";
import { FC } from "react";

export const Board: FC<BoardType> = ({
  target,
  rows,
  cols
}) => {
  return <>
    {Array.from({ length: rows }, (_, rowIdx) => (
      <div key={rowIdx} className="flex">
        {Array.from({ length: cols }, (_, colIdx) => {
          const isDarkSquare = (rowIdx + colIdx) % 2 === 1;
                  
          return <BoardSquare 
            key={`${rowIdx}${colIdx}`}
            lastRow={rowIdx === rows - 1 ? colIdx + 1 : undefined}
            lastCol={colIdx === cols - 1 ? rowIdx + 1 : undefined}
            isDarkSquare={isDarkSquare} 
          />
        })}
      </div>
    ))}
  </>
}

const BoardSquare = ({ 
  lastRow,
  lastCol,
  isDarkSquare 
}: { 
  lastRow?: number,
  lastCol?: number,
  isDarkSquare: boolean 
}) => {
  return <div
    className={`${isDarkSquare ? "bg-black" : "bg-white"} w-[80px] h-[80px] relative`}
  >
    {lastRow && <p
      className="absolute left-0 bottom-0 pl-0.5"
    >
      {ROWS[lastRow - 1]}
    </p>}
    {lastCol && <p
      className="absolute right-0 top-0 pr-0.5"
    >
      {lastCol}
    </p>}
  </div>;
}

const ROWS = Array.from({ length: 16 }, (_, r) => String.fromCharCode(r + 97));