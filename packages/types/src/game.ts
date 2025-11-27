import { SquareType } from "./square"

export type Game = {
  mode: "init" | "send" | "verify",
  target?: SquareType
}