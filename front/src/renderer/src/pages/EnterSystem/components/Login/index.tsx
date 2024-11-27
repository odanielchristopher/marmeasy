import Button from '@renderer/components/Button';
import FormGroup from '@renderer/components/FormGroup';
import Input from '@renderer/components/Input';

import useErrors from '@renderer/hooks/useErrors';
import { useState } from 'react';

import isEmailValid from '@renderer/utils/isEmailValid';

import delay from '@renderer/utils/delay';
import { ButtonContainer, Container } from './styles';

export default function Login(): JSX.Element {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    setError,
    removeError,
    getErrorMessageByFieldName,
  } = useErrors();

  function handleEmailChange(event) {
    setEmail(event.target.value);

    if (event.target.value && !isEmailValid(event.target.value)) {
      setError({ field: 'email', message: 'E-mail inválido' });
    } else {
      removeError('email');
    }
  }

  async function handleSubtmit() {
    setIsLoading(true);
    await delay(2000);
    setIsLoading(false);
  }

    return (
      <Container>
        <h1>Entrar no sistema</h1>

        <p>Entre com seu e-mail e senha</p>

        <FormGroup error={getErrorMessageByFieldName('name')}>
          <Input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={handleEmailChange}
            error={getErrorMessageByFieldName('email')}
          />
        </FormGroup>

        <FormGroup>
          <Input
            type="password"
            placeholder="Senha"
          />
        </FormGroup>

        <ButtonContainer>
          <Button
            type="submit"
            onClick={handleSubtmit}
            isLoading={isLoading}
          >
            Entrar
          </Button>
        </ButtonContainer>
      </Container>
    );
}
