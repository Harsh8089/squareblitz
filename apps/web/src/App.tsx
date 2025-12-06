import { FC } from "react";
import { Game } from "./components";

export const App: FC = () => {
  return <div className="w-screen h-screen flex justify-center items-center font-mono">
    <Game />
  </div>
}