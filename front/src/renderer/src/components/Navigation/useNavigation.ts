import { useAuth } from '@renderer/hooks/useAuth';
import openProfileModal from '@renderer/utils/openProfileModal';
import { useNavigate } from 'react-router-dom';


export default function useNavigation() {
  const { signout } = useAuth();

  const navigateTo = useNavigate();

  function handleClientsLink() {
    navigateTo('/');
  }

  function handleMenuLink() {
    navigateTo('/menu');
  }

  function handleProfileLink() {
    openProfileModal();
  }

  function handleLogOutLink() {
    signout();
  }

  return {
    handleLogOutLink,
    handleClientsLink,
    handleProfileLink,
    handleMenuLink
  };
}
