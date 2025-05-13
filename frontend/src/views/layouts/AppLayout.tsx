import { Link, Outlet } from 'react-router';

import { useIsMobile } from '@app/hooks/useIsMobile';
import { routes } from '@app/Router/routes';
import { Logo } from '@views/assets/Logo';
import { AppNavigation } from '@views/components/app/AppNavigation';
import { Fab } from '@views/components/app/Fab';
import { GlobalModals } from '@views/components/app/GlobalModals';
import { ThemeSwitcher } from '@views/components/app/ThemeSwitcher';
import { UserMenu } from '@views/components/app/UserMenu';
import { UserMobileMenu } from '@views/components/app/UserMobileMenu';

export function AppLayout() {
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col h-full">
      <GlobalModals />

      <header className="fixed z-10 top-0 w-full px-4 md:px-6 py-4 border-b mb-4 bg-primary dark:bg-background">
        <div className="flex items-center justify-between w-full max-w-[1440px] mx-auto">
          <div className="flex gap-4 items-center">
            <Link to={routes.customers}>
              <Logo className="text-teal-950 dark:text-foreground" />
            </Link>

            <AppNavigation />
          </div>

          <div className="flex flex-1 justify-end items-center gap-2">
            <ThemeSwitcher className="bg-transparent text-white hover:!bg-[#DEE2E6]/20  hover:text-white" />

            {isMobile && <UserMobileMenu />}

            {!isMobile && <UserMenu />}
          </div>
        </div>
      </header>

      <main className="flex-1 pt-20 w-full max-w-[1440px] mx-auto relative">
        <Outlet />

        <Fab />
      </main>
    </div>
  );
}
