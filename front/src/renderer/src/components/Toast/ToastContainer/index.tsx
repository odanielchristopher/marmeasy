import { useEffect, useState } from 'react';
import ToastMessage, { IToastMessage } from '../ToastMessage';
import { Container } from './styles';

export default function ToastContainer(): JSX.Element {
  const [messages, setMessages] = useState<IToastMessage[]>([]);

  useEffect(() => {
    function handleAddToast(event) {
      const { type, text } = (event as CustomEvent).detail;

      setMessages((prevState) => [
        ...prevState,
        {id: Math.random(), type, text}
      ]);
    }


    document.addEventListener('addtoast', handleAddToast);

    return () => {
      document.removeEventListener('addtoast', handleAddToast);
    };
  }, []);

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          type={message.type}
          text={message.text}
        />
      ))}
    </Container>
  );
}
