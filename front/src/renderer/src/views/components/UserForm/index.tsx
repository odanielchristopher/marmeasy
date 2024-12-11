
import Button from '../Button';
import Input from '../Input';
import { ButtonContainer, Form } from './styles';
import useUserForm from './useUserForm';

interface UserFormProps {
  buttonLabel: string
  onSubmit(user): void
}

export default function UserForm({ onSubmit, buttonLabel }: UserFormProps) {
  const {
    email,
    password,
    isSubmiting,
    isFormValid,
    getErrorMessageByFieldName,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit
  } = useUserForm(onSubmit);

  return (
    <Form onSubmit={handleSubmit} noValidate>
        <Input
          type="email"
          name='email'
          placeholder="E-mail"
          // value={email}
          // onChange={handleEmailChange}
          $error={getErrorMessageByFieldName('email')}
        />

        <Input
          type="password"
          name='senha'
          placeholder="Senha"
          // value={password}
          // onChange={handlePasswordChange}
          $error={getErrorMessageByFieldName('password')}
        />

      <ButtonContainer>
        <Button
          type="submit"
          isLoading={isSubmiting}
          disabled={!isFormValid}
        >
          {buttonLabel}
        </Button>
      </ButtonContainer>

    </Form>
  );
}
