import { Navigate, Outlet } from 'react-router-dom';

interface AuthGuardProps {
  isPrivate: boolean
}

export default function AuthGuard({ isPrivate }: AuthGuardProps) {
  const signedIn = false;

  if (!signedIn && isPrivate) {
    Navigate({ to: '/login', replace: true });
  }

  if (signedIn && !isPrivate) {
    Navigate({ to: '/', replace: true });
  }

  return <Outlet />;
}
