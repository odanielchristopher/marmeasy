
import Button from '../Button';
import { Input } from '../Input';

import useUserFormController from './useUserForm';

import { ButtonContainer, Form } from './styles';

interface UserFormProps {
  buttonLabel: string
  onSubmit(user): void
}

export default function UserForm({ buttonLabel }: UserFormProps) {
  const {
    register,
    handleSubmit,
  } = useUserFormController();

  return (
    <Form onSubmit={handleSubmit} noValidate>
        <Input
          type="email"
          placeholder="E-mail"
          {...register('email')}
        />

        <Input
          type="password"
          placeholder="Senha"
          {...register('password')}
        />

      <ButtonContainer>
        <Button
          type="submit"
        >
          {buttonLabel}
        </Button>
      </ButtonContainer>

    </Form>
  );
}
