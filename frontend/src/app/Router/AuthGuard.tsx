import { Navigate, Outlet } from 'react-router';

import { useAuth } from '../hooks/useAuth';

import { routes } from './routes';

interface IAuthGuardProps {
  isPrivate: boolean;
}

export function AuthGuard({ isPrivate }: IAuthGuardProps) {
  const { signedIn } = useAuth();

  if (!signedIn && isPrivate) {
    return <Navigate to={routes.login} replace />;
  }

  if (signedIn && !isPrivate) {
    return <Navigate to={routes.customers} replace />;
  }

  return <Outlet />;
}
