import Logo from '../assets/chess-board.svg';
import { NavLink } from 'react-router-dom';
import { FC } from 'react';

const navDetails = [
  { title: 'About', path: 'about' },
  { title: 'Play', path: '/game' },
  { title: 'Register', path: 'sign-up' },
  { title: 'Login', path: 'sign-in' },
] as const;

export const Navbar: FC = () => {
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
        {navDetails.map(({ title, path }) => (
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
        ))}
      </ul>
    </nav>
  );
};
