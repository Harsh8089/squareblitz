import { 
  createContext, 
  FC, 
  ReactNode, 
  useContext,
} from "react";
import { AuthContextType } from "./authContextType";
import { User } from "@repo/types/user";
import axios from "axios";
import { ResponseType } from "../types";

type Prop = {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<Prop> = ({ children }) => {
  const login = async (user: User): Promise<ResponseType> => {
    try {
      const response = await axios.post("http://localhost:8000/api/auth/signin", {
        username: user.username,
        password: user.password
      });

      if(!response.data.success) {
        return {
          success: false,
          error: response.data.message
        }
      }

      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", JSON.stringify(response.data.accessToken));

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: "Something went wrong during login"
      }   
    }
  }

  const logout = async (): Promise<ResponseType> => {
    try {
      const response = await axios.post("http://localhost:8000/api/auth/logout");
      if(!response.data.success) {
        return {
          success: false,
          error: response.data.message
        }
      }

      localStorage.removeItem("user");
      localStorage.removeItem("token");

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: "Something went wrong during logout"
      } 
    } 
  }
  
  return <AuthContext.Provider value={{ login, logout }}>
    { children }
  </AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);