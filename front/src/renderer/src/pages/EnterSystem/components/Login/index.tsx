import Button from '@renderer/components/Button';
import FormGroup from '@renderer/components/FormGroup';
import Input from '@renderer/components/Input';

import useErrors from '@renderer/hooks/useErrors';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import isEmailValid from '@renderer/utils/isEmailValid';

import delay from '@renderer/utils/delay';
import { ButtonContainer, Container } from './styles';

export default function Login(): JSX.Element {
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

  return (
    <Container>
      <h1>Entrar no sistema</h1>

      <p>Entre com seu e-mail e senha</p>

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
        <Button type="submit" onClick={handleSubmit} isLoading={isLoading}>
          Entrar
        </Button>
      </ButtonContainer>
    </Container>
  );
}
