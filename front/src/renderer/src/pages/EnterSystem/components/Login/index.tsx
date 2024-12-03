import Button from '@renderer/components/Button';
import FormGroup from '@renderer/components/FormGroup';
import Input from '@renderer/components/Input';

import useLogin from './useLogin';

import { ButtonContainer } from '../ButtonContainter';
import { ButtonViewing } from '../ButtonViewing';
import { Description } from '../Description';
import { SectionContainer } from '../SectionContainer';
import { Title } from '../Title';

export interface ILogin {
  handleViewing: () => void
}

export default function Login({ handleViewing }: ILogin): JSX.Element {
  const {
    email,
    password,
    isSubmiting,
    isFormValid,
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
          disabled={isSubmiting}
          $error={getErrorMessageByFieldName('email')}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('password')}>
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={handlePasswordChange}
          disabled={isSubmiting}
          $error={getErrorMessageByFieldName('password')}
        />
      </FormGroup>

      <ButtonContainer>
        <Button
          type="submit"
          onClick={handleSubmit}
          isLoading={isSubmiting}
          disabled={!isFormValid}
        >
          Entrar
        </Button>
      </ButtonContainer>

      <ButtonViewing
        type="button"
        onClick={handleViewing}
      >
        Ainda não possuo conta.
      </ButtonViewing>
    </SectionContainer>
  );
}
