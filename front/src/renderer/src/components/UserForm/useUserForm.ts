import { useState } from 'react';

import useErrors from '@renderer/hooks/useErrors';
import isEmailValid from '@renderer/utils/isEmailValid';

export default function useUserForm(onSubmit) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmiting, setIsSubmiting] = useState(false);

  const { setError, removeError, getErrorMessageByFieldName } = useErrors();

  const isFormValid = Boolean(((email && isEmailValid(email)) && password.length >= 6));

  function handleEmailChange(event) {
    setEmail(event.target.value);
    if (event.target.value && !isEmailValid(event.target.value)) {
      removeError('email');
      setError({ field: 'email', message: 'E-mail inválido' });
    } else if (!event.target.value) {
      removeError('email');
      setError({ field: 'email', message: 'O campo de e-mail é obrigatório' });
    } else {
      removeError('email');
    }
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
    if ( event.target.value && event.target.value.length < 6) {
      removeError('password');
      setError({ field: 'password', message: 'A senha deve ter pelo menos 6 caracteres' });
    } else if (!event.target.value) {
      removeError('password');
      setError({ field: 'password', message: 'O campo de senha é obrigatória' });
    } else {
      removeError('password');
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsSubmiting(true);
    await onSubmit({ email, password });
    setIsSubmiting(false);
  }

  return {
    email,
    password,
    isSubmiting,
    isFormValid,
    handleEmailChange,
    handlePasswordChange,
    getErrorMessageByFieldName,
    handleSubmit
  };
}
