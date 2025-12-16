import { FC } from "react";
import { 
  BrowserRouter,
  Navigate,
  Route,
  Routes 
} from "react-router-dom";
import { 
  Root, 
  Game, 
  Welcome, 
  SignIn, 
  SignUp 
} from "./pages";

export const App: FC = () => {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Root />} >
        <Route index element={<Navigate to="/welcome" />} />
        <Route path="welcome" element={<Welcome />}>
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
        </Route>
        <Route path="game" element={<Game />} />
      </Route>
    </Routes>
  </BrowserRouter>
}