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
import { Navigate, Route, Routes } from 'react-router-dom';
import { GameSetup, GameStats } from './components';
import { FC } from 'react';
import { URL } from './utils';

export const App: FC = () => {
  return (
    <Routes>
      <Route path={URL.ROOT} element={<Root />}>
        <Route index element={<Navigate to={URL.WELCOME} replace />} />
        <Route path={URL.WELCOME} element={<Welcome />}>
          <Route path={URL.LOGIN} element={<SignIn />} />
          <Route path={URL.REGISTER} element={<SignUp />} />
        </Route>
        <Route path={URL.GAME} element={<ProtectedRoute />}>
          <Route index element={<Navigate to={URL.SETUP} replace />} />
          <Route path={URL.SETUP} element={<GameSetup />} />
          <Route path={URL.ID} element={<Game />} />
          <Route path={URL.STATS} element={<GameStats />} />
          <Route path={URL.ACCOUNT} element={<Statistics />} />
        </Route>
        <Route path={URL.LEADERBOAD} element={<LeaderBoard />} />
      </Route>
    </Routes>
  );
};
