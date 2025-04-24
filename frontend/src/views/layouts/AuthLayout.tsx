import { useState } from 'react';
import { Navigate, Outlet } from 'react-router';

import { routes } from '@app/Router/routes';

interface IAuthLayoutProps {
  isPrivate: boolean;
}

export function AuthLayout({ isPrivate }: IAuthLayoutProps) {
  const [signedIn] = useState(true);

  if (signedIn && !isPrivate) {
    return <Navigate to={routes.customers} replace />;
  }

  if (!signedIn && isPrivate) {
    return <Navigate to={routes.login} replace />;
  }

  return <Outlet />;
}
