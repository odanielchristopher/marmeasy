import { Transition } from '@headlessui/react';

import Spinner from '../Spinner';
import { Container } from './styles';

import useAnimatedUnmount from '@renderer/app/hooks/useAnimatedUnmount';

import fraseSvg from '@renderer/assets/Images/nome-marmeasy.svg';

interface LaunchScreenProps {
  isLoading: boolean;
}

export default function LaunchScreen({ isLoading }: LaunchScreenProps) {
  const { animatedElementRef } = useAnimatedUnmount(isLoading);

  return (
    <Transition show={isLoading}>
      <Container $isLeaving={!isLoading} ref={animatedElementRef}>
        <div>
          <img src={fraseSvg} alt="Marmeasy logo" />
          <Spinner size={32} color="green" />
        </div>
      </Container>
    </Transition>
  );
}
