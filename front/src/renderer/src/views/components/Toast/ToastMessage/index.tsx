import { useEffect } from 'react';
import { Container } from './styles';

import { CgCloseO } from 'react-icons/cg';
import { FaRegCircleCheck } from 'react-icons/fa6';

export type ToastType = 'default' | 'danger' | 'success';

export interface IMessage {
  id: number
  text: string
  type?: ToastType
  duration?: number
}

interface IToastMessage {
  message: IMessage
  isLeaving: boolean
  onRemoveMessage: (id) => void // eslint-disable-line no-unused-vars
  animatedRef?: React.RefObject<HTMLDivElement>
}

export default function ToastMessage({ message, isLeaving, onRemoveMessage, animatedRef }: IToastMessage): JSX.Element | null {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onRemoveMessage(message.id);
    }, message.duration || 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [message, onRemoveMessage]);


  function handleRemoveToast() {
    onRemoveMessage(message.id);
  }

  return (
    <Container
      type={message.type}
      onClick={handleRemoveToast}
      tabIndex={0}
      role="button"
      $isLeaving={isLeaving}
      ref={animatedRef}
    >
      {message.type === 'success' && <FaRegCircleCheck size={20}/>}
      {message.type === 'danger' && <CgCloseO size={22}/>}
      <strong>{message.text}</strong>
    </Container>
  );
}
