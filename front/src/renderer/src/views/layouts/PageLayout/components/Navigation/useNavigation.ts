import { useAuth } from '@renderer/app/hooks/useAuth';
import { useModals } from '@renderer/app/hooks/useModals';

export default function useNavigation() {
  const { signout } = useAuth();
  const { handleOpenProfileModal } = useModals();

  function handleProfileLink() {
    handleOpenProfileModal();
  }

  function handleLogOutLink() {
    signout();
  }

  return {
    handleLogOutLink,
    handleProfileLink,
  };
}
