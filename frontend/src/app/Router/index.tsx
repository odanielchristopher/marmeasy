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
const { CreateUser } = lazyLoad(() => import('@views/pages/CreateUser'));
const { AppHeaderLayout } = lazyLoad(
  () => import('@views/layouts/AppHeaderLayout'),
);

export function Router() {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route element={<AppHeaderLayout />}>
          <Route path={routes.home} element={<Customers />} />
          <Route path={routes.form} element={<CreateUser />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
