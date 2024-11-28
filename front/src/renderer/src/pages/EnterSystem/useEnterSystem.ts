import { useState } from 'react';

export default function useEnterSystem() {
  const [isRegistered, setIsRegistered] = useState(true);

  function handleViewingLoginOrRegisterComponent() {
    if (isRegistered) {
      setIsRegistered(false);
    } else {
      setIsRegistered(true);
    }
  }

  return {
    isRegistered,
    handleViewingLoginOrRegisterComponent
  };
}
