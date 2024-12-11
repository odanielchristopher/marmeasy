import { useAuth } from '@renderer/app/hooks/useAuth';
import { useNavigate } from 'react-router-dom';


export default function useNavigation(onClickProfile) {
  const { signout } = useAuth();

  const navigateTo = useNavigate();

  function handleClientsLink() {
    navigateTo('/');
  }

  function handleMenuLink() {
    navigateTo('/menu');
  }

  function handleProfileLink() {
    onClickProfile();
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
