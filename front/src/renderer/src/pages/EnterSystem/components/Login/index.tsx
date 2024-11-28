import Button from '@renderer/components/Button';
import FormGroup from '@renderer/components/FormGroup';
import Input from '@renderer/components/Input';

import useLogin from './useLogin';

import { ButtonContainer } from '../ButtonContainter';
import { ButtonViewing } from '../ButtonViewing';
import { Description } from '../Description';
import { SectionContainer } from '../SectionContainer';
import { Title } from '../Title';

import { ILogin } from './interface';

export default function Login({ handleViewing }: ILogin): JSX.Element {
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
    <SectionContainer>
      <Title>Entrar no sistema</Title>

      <Description>Entre com seu e-mail e senha</Description>

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

      <ButtonViewing
        type="button"
        onClick={() => handleViewing(false)}
      >
        Ainda não possuo conta.
      </ButtonViewing>
    </SectionContainer>
  );
}
