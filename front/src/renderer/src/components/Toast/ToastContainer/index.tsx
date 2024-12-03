import { useCallback, useEffect, useState } from 'react';

import { toastEventManager } from '@renderer/utils/toast';
import ToastMessage, { IMessage } from '../ToastMessage';

import { Container } from './styles';

export default function ToastContainer(): JSX.Element {
  const [messages, setMessages] = useState<IMessage[]>([]);

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
    setMessages((prevState) => prevState.filter(
      (message) => message.id !== id
    ));
  }, []);

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={handleRemoveMessage}
        />
      ))}
    </Container>
  );
}
