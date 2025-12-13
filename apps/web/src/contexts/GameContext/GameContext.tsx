import { 
  createContext, 
  FC, 
  ReactNode, 
  useContext,
} from "react";
import axios from "axios";
import { 
  GameContextType, 
} from "./gameContextType";
import { SquareType } from "@repo/types/square";
import { ResponseType } from "../types";
import { BoardSize } from "@repo/types/board";

type Prop = {
  children: ReactNode;
};

const GameContext = createContext<GameContextType | undefined>(undefined); 

export const GameProvider: FC<Prop> = ({ children }) => {
  const start = async (): Promise<ResponseType> => {
    const token = localStorage.getItem("token");

    if(!token) {
      return {
        success: false,
        error: "Token not found"
      }
    }

    try {
      const response = await axios.get("http://localhost:8000/api/game/start", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if(!response.data.success) {
        return {
          success: false,
          error: "Failed to start game"
        }
      }

      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: "Something went wrong to start game"
      }
    }
  }

  const send = async (size: BoardSize): Promise<ResponseType> => {
    const token = localStorage.getItem("token");

    if(!token) {
      return {
        success: false,
        error: "Token not found"
      }
    }

    try {
      const response = await axios.get("http://localhost:8000/api/game/send", {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params: {
          size
        }
      });

      if(!response.data.success) {
        return {
          success: false,
          error: "Failed to send target"
        }
      }

      return {
        success: true,
        data: response.data.data
      };
    } catch (error) {
      return {
        success: false,
        error: "Something went wrong to start game"
      }
    }
  }

  const end = (): boolean => {
    return true;
  }

  const verify = async (
    timeTaken: number, 
    target: SquareType
  ): Promise<ResponseType> => {
    const token = localStorage.getItem("token");

    if(!token) {
      return {
        success: false,
        error: "Token not found"
      }
    }

    try {
      const response = await axios.post("http://localhost:8000/api/game/verify", {
        timeTaken,
        target
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      }); 

      if(!response.data.success) {
        if(!response.data.success) {
          return {
            success: false,
            error: "Failed to verify game"
          }
        }
      }

      return {
        success: true,
        statusCode: response.status
      };
    } catch (error) {
      return {
        success: false,
        error: "Something went wrong to verify game"
      }
    }
  }

  return <GameContext.Provider value={{ 
    start, 
    end, 
    send, 
    verify 
  }}>
    { children }
  </GameContext.Provider>
}

export const useGame = () => useContext(GameContext);