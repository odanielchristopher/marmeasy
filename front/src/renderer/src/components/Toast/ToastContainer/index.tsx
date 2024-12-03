import { useEffect } from 'react';

import { toastEventManager } from '@renderer/utils/toast';
import ToastMessage, { IMessage } from '../ToastMessage';

import useAnimatedList from '@renderer/hooks/useAnimatedList';
import { Container } from './styles';

export default function ToastContainer(): JSX.Element {
  const {
    items: messages,
    setItems: setMessages,
    pendingRemovalItemsIds,
    handleRemoveItem,
    handleAnimationEnd
  } = useAnimatedList<IMessage>([{ id: 123, type: 'sucess', text: 'Hello world' }]);

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
  }, [setMessages]);

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={handleRemoveItem}
          isLeaving={pendingRemovalItemsIds.includes(message.id)}
          onAnimationEnd={handleAnimationEnd}
        />
      ))}
    </Container>
  );
}
