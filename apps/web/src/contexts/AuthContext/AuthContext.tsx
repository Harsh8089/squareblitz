import { 
  createContext, 
  FC, 
  ReactNode, 
  useContext, 
  useEffect, 
  useState 
} from "react";
import { AuthContextType, User } from "./authContextType";

type Prop = {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<Prop> = ({ children }) => {
  const [user, setUser] = useState<User>();
  
  const login = (user?: User) => {
    if(!user) {
      return false;
    }

    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    return true;
  }

  const logout = () => {
    setUser(undefined);
    localStorage.removeItem("user");
  }

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if(storedUser) {
      const user = JSON.parse(storedUser);
      setUser(user);
    }
  }, []);

  return <AuthContext.Provider value={{ user, login, logout }}>
    { children }
  </AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);