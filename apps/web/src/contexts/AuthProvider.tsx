import { createContext, FC, ReactNode, useContext, useState } from 'react';
import { authService } from '../services';

type Prop = {
  children: ReactNode;
};

type AuthContextType = {
  user: string | null;
  setUser: (user: string | null) => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
});

export const AuthProvider: FC<Prop> = ({ children }) => {
  const [user, setUser] = useState<string | null>(() =>
    authService.getCurrentUser(),
  );

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error('useAuth must be used within AuthProvider');

  return context;
};
