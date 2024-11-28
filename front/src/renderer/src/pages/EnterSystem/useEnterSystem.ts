import { useState } from 'react';

export default function useEnterSystem() {
  const [isRegistered, setIsRegistered] = useState(true);

  function handleToogleView() {
    setIsRegistered((prevState) => !prevState);
  }

  return {
    isRegistered,
    handleToogleView
  };
}
