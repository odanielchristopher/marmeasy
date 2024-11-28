import useErrors from '@renderer/hooks/useErrors';
import UserService from '@renderer/services/UserService';
import isEmailValid from '@renderer/utils/isEmailValid';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmiting, setIsSubmiting] = useState(false);

  const navigate = useNavigate();

  const { setError, removeError, getErrorMessageByFieldName } = useErrors();

  const isFormValid = Boolean((email && password.length >= 6));

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
    // const emailValid = 'root@mail.com';
    // const passwordValid = '123root';

    // setIsLoading(true);
    // await delay(2000); // Simula a requisição de login
    // setIsLoading(false);

    // if (!(email === emailValid) && !(password === passwordValid)) {
    //   return;
    // }
    setIsSubmiting(true);
    const isAuthorizated = await UserService.getAuthorization({ email, password });
    setIsSubmiting(false);

    // Se tudo estiver certo, redireciona para a página home
    if (isAuthorizated) {
      navigate('/orders');
    }
  }

  return {
    email,
    password,
    isSubmiting,
    isFormValid,
    getErrorMessageByFieldName,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit
  };
}
