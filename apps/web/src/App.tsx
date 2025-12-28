import {
  Root,
  Game,
  Welcome,
  SignIn,
  SignUp,
  Statistics,
  LeaderBoard,
} from './pages';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { FC } from 'react';

export const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<Navigate to="/welcome" />} />
          <Route path="welcome" element={<Welcome />}>
            <Route path="sign-in" element={<SignIn />} />
            <Route path="sign-up" element={<SignUp />} />
          </Route>
          <Route path="game" element={<Game />} />
          <Route path="account" element={<Statistics />} />
          <Route path="leaderboards" element={<LeaderBoard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
