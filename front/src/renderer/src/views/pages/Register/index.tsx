import { Link } from 'react-router-dom';

import Button from '@renderer/views/components/Button';
import { Input } from '@renderer/views/components/Input';

import useRegisterController from './useRegisterController';

import { Container, Description, Title } from './styles';

export default function Register() {
const {
    errors,
    isLoading,
    register,
    handleSubmit,
  } = useRegisterController();

  return (
    <Container>
      <Title>Seja bem-vindo à Marmeasy</Title>

      <Description>Digite um email e senha de sua preferência</Description>

      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Nome"
          isLoading={isLoading}
          $error={errors.name?.message}
          {...register('name')}
        />

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
          Registrar conta
        </Button>

    </form>

      <Link
        to='/login'
      >
        Já possuo uma conta.
      </Link>
    </Container>
  );
}
