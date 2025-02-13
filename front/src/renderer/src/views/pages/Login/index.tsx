import useLogin from './useLogin';

import Button from '@renderer/views/components/Button';
import { Input } from '@renderer/views/components/Input';
import {
  Container,
  Description,
  Header,
  StyledLink,
  TextContainer,
  Title,
} from './styles';

export default function Login() {
  const { errors, isLoading, register, handleSubmit } = useLogin();

  return (
    <Container>
      <Header>
        <Title>Acesse sua conta</Title>

        <TextContainer>
          <Description>Novo por aqui?</Description>
          <StyledLink to="/register">Crie uma conta</StyledLink>
        </TextContainer>
      </Header>

      <form onSubmit={handleSubmit}>
        <Input
          type="email"
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

        <Button type="submit" isLoading={isLoading}>
          Entrar
        </Button>
      </form>
    </Container>
  );
}
