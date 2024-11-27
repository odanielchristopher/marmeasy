import Button from '@renderer/components/Button';
import FormGroup from '@renderer/components/FormGroup';
import Input from '@renderer/components/Input';

import useRegister from './useRegister';

import { ButtonContainer, Container } from './styles';

export default function Register(): JSX.Element {
  const {
    email,
    password,
    isLoading,
    getErrorMessageByFieldName,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit
  } = useRegister();

  return (
    <Container>
      <h1>Seja bem-vindo à Marmeasy</h1>

      <p>Digite um email e senha de sua preferência</p>

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
          Registrar conta
        </Button>
      </ButtonContainer>

      <span>Já possuo conta</span>
    </Container>
  );
}
