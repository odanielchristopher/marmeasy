
import Button from '../Button';
import { Input } from '../Input';

import useUserFormController from './useUserForm';

import { ButtonContainer } from './styles';

interface UserFormProps {
  buttonLabel: string
  onSubmit(user): void
}

export default function UserForm({ buttonLabel }: UserFormProps) {
  const {
    register,
    errors,
    handleSubmit,
  } = useUserFormController();

  return (
    <form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="E-mail"
          $error={errors.email?.message}
          {...register('email')}
        />


        <Input
          type="password"
          placeholder="Senha"
          $error={errors.password?.message}
          {...register('password')}
        />

      <ButtonContainer>
        <Button
          type="submit"
        >
          {buttonLabel}
        </Button>
      </ButtonContainer>

    </form>
  );
}
