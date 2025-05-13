import { useSearchParams } from 'react-router';

import { lazyLoad } from '@app/utils/lazyLoad';

const { Categories } = lazyLoad(() => import('./components/Categories'));
const { Products } = lazyLoad(() => import('./components/Products'));

const sessions = [
  { name: 'products', comp: Products },
  { name: 'categories', comp: Categories },
];

export function useMenuController() {
  const [searchParams] = useSearchParams();

  const currentSession = searchParams.get('session');

  const findedSession = sessions.find(
    (session) => session.name === currentSession,
  );

  return {
    findedSession,
    currentSession,
  };
}
