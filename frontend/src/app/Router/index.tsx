import { Suspense } from 'react';
import { Route, Routes } from 'react-router';

import { lazyLoad } from '@app/utils/lazyLoad';
import { LaunchScreen } from '@views/components/app/LaunchScreen';
import { NotFoundPage } from '@views/components/app/NotFoundPage';

import { AuthGuard } from './AuthGuard';
import { routes } from './routes';

// Sem lazy loading (baixa tudo de uma vez);
// import { CreateUser } from '@views/pages/CreateUser';
// import { Home } from '@views/pages/Home';

// Com lazy loading (baixa só quando precisa);
const { Customers } = lazyLoad(() => import('@views/pages/Customers'));
const { Orders } = lazyLoad(() => import('@views/pages/Orders'));
const { AuthLayout } = lazyLoad(() => import('@views/layouts/AuthLayout'));
const { Menu } = lazyLoad(() => import('@views/pages/Menu'));
const { Dashboard } = lazyLoad(() => import('@views/pages/Dashboard'));
const { AppLayout } = lazyLoad(() => import('@views/layouts/AppLayout'));
const { Register } = lazyLoad(() => import('@views/pages/Register'));
const { Login } = lazyLoad(() => import('@views/pages/Login'));
const { Customer } = lazyLoad(() => import('@views/pages/Customer'));

export function Router() {
  return (
    <Suspense fallback={<LaunchScreen isLoading />}>
      <Routes>
        <Route element={<AuthGuard isPrivate />}>
          <Route element={<AppLayout />}>
            <Route path={routes.customers} element={<Customers />} />

            <Route path={routes.customer}>
              <Route path=":id" element={<Customer />} />
            </Route>

            <Route path={routes.orders} element={<Orders />} />
            <Route path={routes.menu} element={<Menu />} />
            <Route path={routes.dashboard} element={<Dashboard />} />
          </Route>
        </Route>

        <Route element={<AuthGuard isPrivate={false} />}>
          <Route element={<AuthLayout />}>
            <Route path={routes.login} element={<Login />} />
            <Route path={routes.register} element={<Register />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
