import { createContext, FC, ReactNode, useEffect, useState } from "react";
import { Filter, Game, GameContextType } from "./gameContextType";

type Prop = {
  children: ReactNode;
};

const GameContext = createContext<GameContextType | undefined>(undefined); 

export const GameProvider: FC<Prop> = ({ children }) => {
  const [games, setGames] = useState<Game[]>([]);

  const setHistory = (g: Game): Game => {    
    setGames(prev => [...prev, g]);
    return g;
  }

  const getHistory = (f?: Filter): Game[] => {
    if(!f || !games.length) {
      return [];
    }

    return games.filter(g => 
      (f.mode && f.mode === g.mode) || (f.timer && f.timer === g.timer)
    );
  }

  useEffect(() => {
    // add fetch call to set games in case user refresh page / login again.
  }, []);

  return <GameContext.Provider value={{ setHistory, getHistory }}>
    { children }
  </GameContext.Provider>
}