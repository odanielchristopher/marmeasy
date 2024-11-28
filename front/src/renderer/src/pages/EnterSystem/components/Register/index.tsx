import Button from '@renderer/components/Button';
import FormGroup from '@renderer/components/FormGroup';
import Input from '@renderer/components/Input';

import useRegister from './useRegister';

import { ButtonContainer } from '../ButtonContainter';
import { ButtonViewing } from '../ButtonViewing';
import { Description } from '../Description';
import { SectionContainer } from '../SectionContainer';
import { Title } from '../Title';

import { IRegister } from './interface';

export default function Register({ handleViewing }: IRegister): JSX.Element {
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
        <Button type="submit" onClick={handleSubmit} isLoading={isLoading}>
          Registrar conta
        </Button>
      </ButtonContainer>

      <ButtonViewing
        type="button"
        onClick={() => handleViewing(false)}
      >
        Já possuo uma conta.
      </ButtonViewing>
    </SectionContainer>
  );
}
