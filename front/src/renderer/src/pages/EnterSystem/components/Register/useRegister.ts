import useErrors from '@renderer/hooks/useErrors';
import delay from '@renderer/utils/delay';
import isEmailValid from '@renderer/utils/isEmailValid';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useRegister() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { setError, removeError, getErrorMessageByFieldName } = useErrors();

  function handleEmailChange(event) {
    setEmail(event.target.value);
    if (event.target.value && !isEmailValid(event.target.value)) {
      setError({ field: 'email', message: 'E-mail inválido' });
    } else {
      removeError('email');
    }
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
    if (event.target.value.length < 6) {
      setError({ field: 'password', message: 'A senha deve ter pelo menos 6 caracteres' });
    } else {
      removeError('password');
    }
  }

  async function handleSubmit() {
    const emailValid = 'root@mail.com';
    const passwordValid = '123root';

    setIsLoading(true);
    await delay(2000); // Simula a requisição de login
    setIsLoading(false);

    if (!(email === emailValid) && !(password === passwordValid)) {
      return;
    }

    // Se tudo estiver certo, redireciona para a página home
    navigate('/orders');
  }

  return {
    email,
    password,
    isLoading,
    getErrorMessageByFieldName,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit
  };
}
