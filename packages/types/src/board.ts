import { SquareType } from "./square"

export type BoardType = {
  target?: SquareType;
  rows: number,
  cols: number
}