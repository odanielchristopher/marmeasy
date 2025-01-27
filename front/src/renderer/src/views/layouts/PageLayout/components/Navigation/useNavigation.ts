import { useAuth } from '@renderer/app/hooks/useAuth';
import { useModals } from '@renderer/app/hooks/useModals';
import { useLocation } from 'react-router-dom';

export default function useNavigation() {
  const { signout } = useAuth();
  const { handleOpenProfileModal } = useModals();
  const { pathname } = useLocation();

  function handleProfileLink() {
    handleOpenProfileModal();
  }

  function handleLogOutLink() {
    signout();
  }

  return {
    handleLogOutLink,
    handleProfileLink,
    pathname,
  };
}
