
import { Link } from 'react-router-dom';

import useLoginController from './useLoginController';

import Button from '@renderer/views/components/Button';
import { Input } from '@renderer/views/components/Input';
import { Container, Description, Title } from './styles';

export default function Login() {
  const {
    errors,
    isLoading,
    register,
    handleSubmit,
  } = useLoginController();

  return (
    <Container>
      <Title>Entrar no sistema</Title>

      <Description>Entre com seu e-mail e senha</Description>

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

        <Button
          type="submit"
          isLoading={isLoading}
        >
          Entrar
        </Button>

    </form>

      <Link
        to='/register'
      >
        Ainda não possuo conta.
      </Link>
    </Container>
  );
}
