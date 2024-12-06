
import { Link } from 'react-router-dom';
import useLogin from './useLogin';

import UserForm from '@renderer/components/UserForm';

import { Container, Description, Title } from './styles';

export default function Login(): JSX.Element {
  const {
    handleSubmit
  } = useLogin();

  return (
    <Container>
      <Title>Entrar no sistema</Title>

      <Description>Entre com seu e-mail e senha</Description>

      <UserForm onSubmit={handleSubmit} buttonLabel='Entrar' />

      <Link
        to='/register'
      >
        Ainda não possuo conta.
      </Link>
    </Container>
  );
}
