import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router';

import { lazyLoad } from '@app/utils/lazyLoad';
import { LaunchScreen } from '@views/components/app/LaunchScreen';
import { EditOrder } from '@views/pages/Orders/EditOrder';

import { AuthGuard } from './AuthGuard';
import { routes } from './routes';

// Sem lazy loading (baixa tudo de uma vez);
// import { CreateUser } from '@views/pages/CreateUser';
// import { Home } from '@views/pages/Home';

// Com lazy loading (baixa só quando precisa);
const { AuthLayout } = lazyLoad(() => import('@views/layouts/AuthLayout'));
const { AppLayout } = lazyLoad(() => import('@views/layouts/AppLayout'));
const { MenuLayout } = lazyLoad(() => import('@views/layouts/MenuLayout'));

const { Customers } = lazyLoad(() => import('@views/pages/Customers'));
const { Customer } = lazyLoad(() => import('@views/pages/Customer'));

const { Orders } = lazyLoad(() => import('@views/pages/Orders'));
const { NewOrder } = lazyLoad(() => import('@views/pages/Orders/NewOrder'));

const { Dashboard } = lazyLoad(() => import('@views/pages/Dashboard'));

const { ProductCategories } = lazyLoad(
  () => import('@views/pages/ProductCategories'),
);
const { Products } = lazyLoad(() => import('@views/pages/Products'));

const { Login } = lazyLoad(() => import('@views/pages/Login'));
const { Register } = lazyLoad(() => import('@views/pages/Register'));

// 404 -> rotas não encontradas;
const { NotFoundPage } = lazyLoad(
  () => import('@views/components/app/NotFoundPage'),
);

export function Router() {
  return (
    <Suspense fallback={<LaunchScreen isLoading />}>
      <Routes>
        <Route element={<AuthGuard isPrivate />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Navigate to={routes.customers} />} />

            <Route path={routes.customers}>
              <Route index element={<Customers />} />
              <Route path=":id" element={<Customer />} />
            </Route>

            <Route path={routes.orders}>
              <Route index element={<Orders />} />
              <Route path="new" element={<NewOrder />} />
              <Route path="edit/:orderId" element={<EditOrder />} />
            </Route>

            <Route path={routes.menu.root} element={<MenuLayout />}>
              <Route path="products" element={<Products />} />
              <Route path="categories" element={<ProductCategories />} />
            </Route>

            <Route path={routes.dashboard} element={<Dashboard />} />
          </Route>
        </Route>

        <Route element={<AuthGuard isPrivate={false} />}>
          <Route element={<AuthLayout />}>
            <Route path={routes.login} element={<Login />} />
            <Route path={routes.register} element={<Register />} />
          </Route>
        </Route>

        <Route path="*?" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
