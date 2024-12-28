import { useEffect } from 'react';

import { toastEventManager } from '@renderer/app/utils/toast';
import ToastMessage, { IMessage } from '../ToastMessage';

import useAnimatedList from '@renderer/app/hooks/useAnimatedList';
import { Container } from './styles';

export default function ToastContainer() {
  const {
    setItems: setMessages,
    renderList,
    handleRemoveItem,
  } = useAnimatedList<IMessage>();

  useEffect(() => {
    function handleAddToast({ type, text, duration }: IMessage) {
      setMessages((prevState) => [
        ...prevState,
        {id: Math.random(), type, text, duration},
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
