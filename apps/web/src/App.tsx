import {
  Root,
  Game,
  Welcome,
  SignIn,
  SignUp,
  Statistics,
  LeaderBoard,
  ProtectedRoute,
} from './pages';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { GameSetup } from './components';
import { FC } from 'react';

export const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<Navigate to="welcome" replace />} />
          <Route path="welcome" element={<Welcome />}>
            <Route path="sign-in" element={<SignIn />} />
            <Route path="sign-up" element={<SignUp />} />
          </Route>
          <Route path="game" element={<ProtectedRoute />}>
            <Route index element={<Navigate to="setup" replace />} />
            <Route path="setup" element={<GameSetup />} />
            <Route path=":id" element={<Game />} />
            <Route path="account" element={<Statistics />} />
          </Route>
          <Route path="leaderboards" element={<LeaderBoard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
