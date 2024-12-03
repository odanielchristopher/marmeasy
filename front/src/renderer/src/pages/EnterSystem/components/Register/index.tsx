import Button from '@renderer/components/Button';
import FormGroup from '@renderer/components/FormGroup';
import Input from '@renderer/components/Input';

import useRegister from './useRegister';

import { ButtonContainer } from '../ButtonContainter';
import { ButtonViewing } from '../ButtonViewing';
import { Description } from '../Description';
import { SectionContainer } from '../SectionContainer';
import { Title } from '../Title';

export interface IRegister {
  onRegister: (value: boolean) => void // eslint-disable-line no-unused-vars
  handleViewing: () => void
}

export default function Register({ handleViewing, onRegister }: IRegister): JSX.Element {
  const {
    email,
    password,
    isSubmiting,
    isFormValid,
    getErrorMessageByFieldName,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit
  } = useRegister(onRegister);

  return (
    <SectionContainer>
      <Title>Seja bem-vindo à Marmeasy</Title>

      <Description>Digite um email e senha de sua preferência</Description>

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
          onClick={handleSubmit}
          isLoading={isSubmiting}
          disabled={!isFormValid}
        >
          Registrar conta
        </Button>
      </ButtonContainer>

      <ButtonViewing
        type="button"
        onClick={handleViewing}
      >
        Já possuo uma conta.
      </ButtonViewing>
    </SectionContainer>
  );
}
