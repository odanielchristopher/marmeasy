import { Transition } from '@headlessui/react';

import Spinner from '../Spinner';
import { Container } from './styles';

import useAnimatedUnmount from '@renderer/app/hooks/useAnimatedUnmount';
import logo from '/frase.png';

interface LaunchScreenProps {
  isLoading: boolean;
}

export default function LaunchScreen({ isLoading }: LaunchScreenProps) {
  const { animatedElementRef } = useAnimatedUnmount(isLoading);

  return (
    <Transition show={isLoading}>
      <Container $isLeaving={!isLoading} ref={animatedElementRef}>
      <div>
        <img src={logo} alt="Marmeasy logo" />
        <Spinner size={32} color="green" />
      </div>
    </Container>
    </Transition>
  );
}
