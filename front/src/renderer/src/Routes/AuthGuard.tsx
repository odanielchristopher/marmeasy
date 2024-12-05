import { useAuth } from '@renderer/hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

interface AuthGuardProps {
  isPrivate: boolean
}

export default function AuthGuard({ isPrivate }: AuthGuardProps) {
  const { signedIn } = useAuth();

  if (!signedIn && isPrivate) {
    Navigate({ to: '/login', replace: true });
  }

  if (signedIn && !isPrivate) {
    Navigate({ to: '/', replace: true });
  }

  return <Outlet />;
}
