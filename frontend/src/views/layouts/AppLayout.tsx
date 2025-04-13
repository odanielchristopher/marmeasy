import { Outlet, useLocation } from 'react-router';

import { useFab } from '@app/hooks/useFab';
import { useIsMobile } from '@app/hooks/useIsMobile';
import { Logo } from '@views/assets/Logo';
import { AppNavigation } from '@views/components/AppNavigation';
import { Fab } from '@views/components/Fab';
import { NewCustomerModal } from '@views/components/modals/NewCustomerModal';
import { NewOrderModal } from '@views/components/modals/NewOrderModal';
import { NewPaymentModal } from '@views/components/modals/NewPaymentModal';
import { ThemeSwitcher } from '@views/components/ThemeSwitcher';
import { UserMenu } from '@views/components/UserMenu';
import { UserMobileMenu } from '@views/components/UserMobileMenu';

export function AppLayout() {
  const { pathname: currentPathname } = useLocation();
  const isMobile = useIsMobile();

  const {
    isOpenNewOrderModal,
    isOpenNewCustomerModal,
    isOpenNewPaymentModal,
    closeNewPaymentModal,
    closeNewOrderModal,
    closeNewCustomerModal,
  } = useFab();

  return (
    <div className="flex flex-col h-full">
      {isOpenNewCustomerModal && (
        <NewCustomerModal open onClose={closeNewCustomerModal} />
      )}
      {isOpenNewOrderModal && (
        <NewOrderModal open onClose={closeNewOrderModal} />
      )}
      {isOpenNewPaymentModal && (
        <NewPaymentModal open onClose={closeNewPaymentModal} />
      )}

      <header className="fixed z-10 top-0 w-full px-4 md:px-6 py-4 border-b mb-4 bg-primary dark:bg-background">
        <div className="flex items-center justify-between w-full max-w-[1440px] mx-auto">
          <div className="flex gap-4 items-center">
            <Logo className="text-teal-950 dark:text-foreground" />

            <AppNavigation currentPathname={currentPathname} />
          </div>

          <div className="flex flex-1 justify-end items-center gap-2">
            <ThemeSwitcher className="bg-transparent text-white hover:!bg-[#DEE2E6]/20  hover:text-white" />

            {isMobile && <UserMobileMenu currentPathname={currentPathname} />}

            {!isMobile && <UserMenu />}
          </div>
        </div>
      </header>

      <main className="flex-1 pt-20 w-full max-w-[1440px] mx-auto">
        <Outlet />
      </main>
      <Fab />
    </div>
  );
}
