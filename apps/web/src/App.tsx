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
import { FC } from 'react';

export const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<Navigate to="/welcome" replace />} />
          <Route path="welcome" element={<Welcome />}>
            <Route path="sign-in" element={<SignIn />} />
            <Route path="sign-up" element={<SignUp />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="game" element={<Game />} />
            <Route path="account" element={<Statistics />} />
          </Route>
          <Route path="leaderboards" element={<LeaderBoard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
