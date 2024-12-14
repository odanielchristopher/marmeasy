import { useAuth } from '@renderer/app/hooks/useAuth';
import { useModal } from '@renderer/app/hooks/useModal';
import { useNavigate } from 'react-router-dom';


export default function useNavigation() {
  const { signout } = useAuth();
  const { handleIsProfileModalOpen } = useModal();

  const navigateTo = useNavigate();

  function handleClientsLink() {
    navigateTo('/');
  }

  function handleMenuLink() {
    navigateTo('/menu');
  }

  function handleProfileLink() {
    handleIsProfileModalOpen();
  }

  function handleLogOutLink() {
    signout();
  }

  return {
    handleLogOutLink,
    handleClientsLink,
    handleProfileLink,
    handleMenuLink,
  };
}
