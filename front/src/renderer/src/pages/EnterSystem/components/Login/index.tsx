import Button from '@renderer/components/Button';
import FormGroup from '@renderer/components/FormGroup';
import Input from '@renderer/components/Input';

import useLogin from './useLogin';

import { ButtonContainer, Container } from './styles';

export default function Login(): JSX.Element {
  const {
    email,
    password,
    isLoading,
    getErrorMessageByFieldName,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit
  } = useLogin();

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
