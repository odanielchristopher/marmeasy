import { Link } from 'react-router';

import { routes } from '@app/Router/routes';

import { ThemeSwitcher } from './ThemeSwitcher';

export function HeaderApp() {
  return (
    <header className="px-6 py-4 flex border-b mb-4 justify-between">
      <div className="flex gap-2 items-center">
        <Link
          className="text-xl font-medium hover:text-gray-200 hover:underline"
          to={routes.index}
        >
          Home
        </Link>
        <Link
          className="text-xl font-medium hover:text-gray-200 hover:underline"
          to={routes.users.new.row}
        >
          Create user
        </Link>
      </div>

      <ThemeSwitcher />
    </header>
  );
}
