import { useAuth, useGame } from '../contexts';
import { GameStatus } from '@repo/types/game';
import Logo from '../assets/chess-board.svg';
import { NavLink } from 'react-router-dom';
import { useLogout } from '../hooks';
import { URL } from '../utils';

export const Navbar = () => {
  const { user } = useAuth();
  const { mutate: logout } = useLogout();
  const { gameState } = useGame();

  if (gameState?.status === GameStatus.ACTIVE) {
    return;
  }

  return (
    <nav className="w-[90%] h-28 py-10 mx-auto px-10 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <img
          src={Logo}
          alt="Squareblitz logo"
          className="w-8"
          width={48}
          height={48}
        />
        <h1 className="text-grain-3 text-xl font-semibold">Squareblitz</h1>
      </div>
      <ul className="flex items-center gap-6">
        {NAVIGATION_DETAILS.map(({ title, path, showOnLogin }) =>
          !!user === showOnLogin ? (
            <li key={title}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `text-grain-3 text-xl font-medium transition-opacity ${
                    isActive ? 'opacity-100' : 'opacity-50 hover:opacity-75'
                  }`
                }
              >
                {title}
              </NavLink>
            </li>
          ) : null,
        )}
        {!!user && (
          <button
            className="text-grain-3 text-xl font-medium transition-opacity opacity-50 hover:opacity-75 cursor-pointer"
            onClick={() => logout()}
          >
            Logout
          </button>
        )}
      </ul>
    </nav>
  );
};

const NAVIGATION_DETAILS = [
  { title: 'About', path: `${URL.ABOUT}`, showOnLogin: false },
  { title: 'Play', path: `./${URL.GAME}`, showOnLogin: true },
  {
    title: 'Register',
    path: `${URL.WELCOME}/${URL.REGISTER}`,
    showOnLogin: false,
  },
  { title: 'Login', path: `${URL.WELCOME}/${URL.LOGIN}`, showOnLogin: false },
  { title: 'Account', path: `${URL.ACCOUNT}`, showOnLogin: true },
] as const;
