import { FC } from "react";
import { Game } from "./components";

export const App: FC = () => {
  return <div className="font-mono overflow-hidden px-48 bg-brown-1">
    <Game />
  </div>
}