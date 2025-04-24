import { Navigate, Outlet } from 'react-router';

import { useAuth } from '@app/hooks/useAuth';
import { routes } from '@app/Router/routes';

interface IAuthLayoutProps {
  isPrivate: boolean;
}

export function AuthLayout({ isPrivate }: IAuthLayoutProps) {
  const { signedIn } = useAuth();

  if (signedIn && !isPrivate) {
    return <Navigate to={routes.customers} replace />;
  }

  if (!signedIn && isPrivate) {
    return <Navigate to={routes.login} replace />;
  }

  return <Outlet />;
}
