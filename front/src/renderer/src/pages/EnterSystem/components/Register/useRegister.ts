import useErrors from '@renderer/hooks/useErrors';
import UserService from '@renderer/services/UserService';
import isEmailValid from '@renderer/utils/isEmailValid';
import toast from '@renderer/utils/toast';
import { useState } from 'react';

// eslint-disable-next-line no-unused-vars
export default function useRegister(onRegister: (value: boolean) => void) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmiting, setIsSubmiting] = useState(false);

  const { setError, removeError, getErrorMessageByFieldName } = useErrors();

  const isFormValid = Boolean(((email && isEmailValid(email)) && password.length >= 6));

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
    setIsSubmiting(true);
    await UserService.registerNewUser({ email, password });
    setIsSubmiting(false);

    onRegister(true);
    toast({
      type: 'sucess',
      text: 'Usuário registrado com sucesso'
    });
  }

  return {
    email,
    password,
    isFormValid,
    isSubmiting,
    getErrorMessageByFieldName,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit
  };
}
