import { useNavigate } from 'react-router-dom';

export default function useNavigation() {
  const navigateTo = useNavigate();

  function handleClientsLink() {
    navigateTo('/clients');
  }

  function handleMenuLink() {
    navigateTo('/menu');
  }

  function handleProfileLink() {
    navigateTo('/profile');
  }

  function handleLogOutLink() {
    navigateTo('/gate');
  }

  return {
    handleLogOutLink,
    handleClientsLink,
    handleProfileLink,
    handleMenuLink
  };
}
