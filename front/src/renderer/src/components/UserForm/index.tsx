import useErrors from '@renderer/hooks/useErrors';
import Button from '../Button';
import FormGroup from '../FormGroup';
import Input from '../Input';

import isEmailValid from '@renderer/utils/isEmailValid';
import { useState } from 'react';
import { ButtonContainer, Form } from './styles';

export default function UserForm() {
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

  return (
    <Form>
      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={handleEmailChange}
          $error={getErrorMessageByFieldName('email')}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('password')}>
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={handlePasswordChange}
          $error={getErrorMessageByFieldName('password')}
        />
      </FormGroup>

      <ButtonContainer>
        <Button
          type="submit"
          onClick={() => {
            setIsSubmiting(true);
            setIsSubmiting(false);
          }}
          isLoading={isSubmiting}
          disabled={!isFormValid}
        >
          Registrar conta
        </Button>
      </ButtonContainer>

    </Form>
  );
}
