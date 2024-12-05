import { useAuth } from '@renderer/hooks/useAuth';
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
    navigateTo('/profile');
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
