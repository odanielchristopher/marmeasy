import { useCallback, useEffect, useState } from 'react';

import { toastEventManager } from '@renderer/utils/toast';
import ToastMessage, { IMessage } from '../ToastMessage';

import { Container } from './styles';

export default function ToastContainer(): JSX.Element {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [pendingRemovalMessageIds, setPendingRemovalMessageIds] = useState<number[]>([]);

  useEffect(() => {
    function handleAddToast({ type, text, duration }) {
      setMessages((prevState) => [
        ...prevState,
        {id: Math.random(), type, text, duration}
      ]);
    }


    toastEventManager.on('addtoast', handleAddToast);

    return () => {
      toastEventManager.removeListener('addtoast', handleAddToast);
    };
  }, []);

  const handleRemoveMessage = useCallback((id) => {
    setPendingRemovalMessageIds(
      (prevState) => [...prevState, id]
    );
  }, []);

  const handleAnimationEnd = useCallback((id) => {
    setMessages((prevState) => prevState.filter((message) => message.id !== id));
    setPendingRemovalMessageIds(
      (prevState) => prevState.filter((messageId) => messageId !== id)
    );
  }, []);

  console.log({ messages, pendingRemovalMessageIds });

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={handleRemoveMessage}
          isLeaving={pendingRemovalMessageIds.includes(message.id)}
          onAnimationEnd={handleAnimationEnd}
        />
      ))}
    </Container>
  );
}
