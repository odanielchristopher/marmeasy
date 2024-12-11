import { Outlet } from 'react-router-dom';

import Navigation from '@renderer/views/components/Navigation';

import Profile from '@renderer/views/pages/Profile';
import { useState } from 'react';
import { Container } from './styles';

export default function NavLayout() {
  const [isOpen, setIsOpen] = useState(true);

  function handleToogleProfileModal() {
    setIsOpen((prevState) => !prevState);
  }

  return (
    <Container>
      <Profile isOpen={isOpen} onClose={handleToogleProfileModal}/>
      <Navigation onClickProfile={handleToogleProfileModal}/>
      <Outlet />
    </Container>
  );
}
