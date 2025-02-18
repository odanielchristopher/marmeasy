import Button from '@renderer/views/components/Button';
import { Input } from '@renderer/views/components/Input';

import useRegister from './useRegister';

import {
  Container,
  Description,
  Header,
  StyledLink,
  TextContainer,
  Title,
} from './styles';

export default function Register() {
  const { errors, isLoading, register, handleSubmit } = useRegister();

  return (
    <Container>
      <Header>
        <Title>Crie sua conta</Title>

        <TextContainer>
          <Description>Já possui uma conta?</Description>
          <StyledLink to="/login">Fazer login</StyledLink>
        </TextContainer>
      </Header>

      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Nome"
          isLoading={isLoading}
          $error={errors.name?.message}
          {...register('name')}
        />

        <Input
          type="text"
          placeholder="E-mail"
          isLoading={isLoading}
          $error={errors.email?.message}
          {...register('email')}
        />

        <Input
          type="password"
          placeholder="Senha"
          isLoading={isLoading}
          $error={errors.password?.message}
          {...register('password')}
        />

        <Input
          type="password"
          placeholder="Confirme sua senha"
          isLoading={isLoading}
          $error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />

        <Button type="submit" isLoading={isLoading}>
          Criar conta
        </Button>
      </form>
    </Container>
  );
}
