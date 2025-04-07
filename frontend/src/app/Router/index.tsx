import { Suspense } from 'react';
import { Route, Routes } from 'react-router';

// Sem lazy loading (baixa tudo de uma vez);
// import { CreateUser } from '@views/pages/CreateUser';
// import { Home } from '@views/pages/Home';

import { lazyLoad } from '@app/utils/lazyLoad';

import { routes } from './routes';

// Com lazy loading (baixa só quando precisa);
const { Home } = lazyLoad(() => import('@views/pages/Home'));
const { CreateUser } = lazyLoad(() => import('@views/pages/CreateUser'));

export function Router() {
  return (
    <Suspense
      fallback={
        <div className="w-10 h-10 rounded-full border-4 border-r-white animate-spin" />
      }
    >
      <Routes>
        <Route path={routes.index} element={<Home />} />

        <Route path={routes.users.prefix}>
          <Route path={routes.users.new} element={<CreateUser />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
