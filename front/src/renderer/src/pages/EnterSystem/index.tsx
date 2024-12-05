import useEnterSystem from './useEnterSystem';

import Login from './components/Login';
import Register from './components/Register';

import Modal from '@renderer/components/Modal';
import { useState } from 'react';
import { Container } from './styles';

export default function EnterSystem(): JSX.Element {
  const {  isRegistered, setIsRegistered, handleToogleView } = useEnterSystem();

  const [isVisible, setIsVisible] = useState(true);

  function toogle() {
    setIsVisible((prevState) => !prevState);
  }

  return (
    <Container>
      <Modal visible={isVisible}>
        <div>
          <button onClick={toogle}>adawdas</button>
        </div>
      </Modal>
      {isRegistered ?
      <Login
        handleViewing={handleToogleView}
      /> :
      <Register
        handleViewing={handleToogleView}
        onRegister={setIsRegistered}
      />}
    </Container>
  );
}
