import { useLocation } from 'react-router';

import { useIsMobile } from '@app/hooks/useIsMobile';
import { Logo } from '@views/assets/Logo';

import { AppNavigation } from './AppNavigation';
import { ThemeSwitcher } from './ThemeSwitcher';
import { UserMenu } from './UserMenu';
import { UserMobileMenu } from './UserMobileMenu';

export function AppHeader() {
  const { pathname: currentPathname } = useLocation();
  const isMobile = useIsMobile();

  return (
    <header className="fixed z-10 top-0 w-full px-4 md:px-6 py-4 f flex border-b mb-4 items-center justify-between bg-primary-400 dark:bg-background">
      <div className="flex gap-2 items-center">
        <Logo className="text-teal-950 dark:text-foreground" />

        <AppNavigation currentPathname={currentPathname} />
      </div>

      <div className="flex flex-1 justify-end items-center gap-2">
        <ThemeSwitcher className="bg-transparent text-white hover:!bg-[#DEE2E6]/20  hover:text-white" />

        {isMobile && <UserMobileMenu currentPathname={currentPathname} />}

        {!isMobile && <UserMenu />}
      </div>
    </header>
  );
}
