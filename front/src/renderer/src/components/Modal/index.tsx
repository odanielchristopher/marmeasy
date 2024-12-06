import useAnimatedUnmount from '@renderer/hooks/useAnimatedUnmount';
import ReactPortal from '../ReactPortal';
import { Container, Overlay } from './styles';

interface ModalProps {
  visible: boolean
  children: JSX.Element
}

export default function Modal({visible, children}: ModalProps) {
  const { shouldRender, animatedElementRef} = useAnimatedUnmount(visible);

  if (!shouldRender) {
    return null;
  }

  return (
    <ReactPortal containerId="modal">
      <Overlay $isLeaving={!visible} ref={animatedElementRef}>
        <Container $isLeaving={!visible}>
          {children}
        </Container>
      </Overlay>
    </ReactPortal>
  );
}
