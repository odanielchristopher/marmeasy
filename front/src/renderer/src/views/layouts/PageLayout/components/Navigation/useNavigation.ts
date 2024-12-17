import { useAuth } from '@renderer/app/hooks/useAuth';
import { useModals } from '@renderer/app/hooks/useModals';
import { useNavigate } from 'react-router-dom';


export default function useNavigation() {
  const { signout } = useAuth();
  const { handleOpenProfileModal } = useModals();

  const navigateTo = useNavigate();

  function handleProfileLink() {
    handleOpenProfileModal();
  }

  function handleClientsLink() {
    navigateTo('/');
  }

  function handleMenuLink() {
    navigateTo('/menu');
  }

  function handleLogOutLink() {
    signout();
  }

  return {
    handleLogOutLink,
    handleClientsLink,
    handleMenuLink,
    handleProfileLink,
  };
}
