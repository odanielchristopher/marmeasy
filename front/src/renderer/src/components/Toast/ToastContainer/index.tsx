import { useEffect } from 'react';

import { toastEventManager } from '@renderer/utils/toast';
import ToastMessage, { IMessage } from '../ToastMessage';

import useAnimatedList from '@renderer/hooks/useAnimatedList';
import { Container } from './styles';

export default function ToastContainer(): JSX.Element {
  const {
    setItems: setMessages,
    renderList,
    handleRemoveItem
  } = useAnimatedList<IMessage>();

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
      {renderList((message, { isLeaving, animatedRef }) => (
      <ToastMessage
        key={message.id}
        message={message}
        onRemoveMessage={handleRemoveItem}
        isLeaving={isLeaving}
        animatedRef={animatedRef}
      />
    ))}
    </Container>
  );
}