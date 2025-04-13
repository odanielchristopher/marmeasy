import { Suspense } from 'react';
import { Route, Routes } from 'react-router';

// Sem lazy loading (baixa tudo de uma vez);
// import { CreateUser } from '@views/pages/CreateUser';
// import { Home } from '@views/pages/Home';

import { lazyLoad } from '@app/utils/lazyLoad';
import { NotFoundPage } from '@views/components/NotFoundPage';
import { Spinner } from '@views/components/ui/Spinner';

import { routes } from './routes';

// Com lazy loading (baixa só quando precisa);
const { Customers } = lazyLoad(() => import('@views/pages/Customers'));
const { Orders } = lazyLoad(() => import('@views/pages/Orders'));
const { Menu } = lazyLoad(() => import('@views/pages/Menu'));
const { Dashboard } = lazyLoad(() => import('@views/pages/Dashboard'));
const { AppLayout } = lazyLoad(() => import('@views/layouts/AppLayout'));

export function Router() {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path={routes.customers} element={<Customers />} />
          <Route path={routes.orders} element={<Orders />} />
          <Route path={routes.menu} element={<Menu />} />
          <Route path={routes.dashboard} element={<Dashboard />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
