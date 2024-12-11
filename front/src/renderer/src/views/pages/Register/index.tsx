
import { Link } from 'react-router-dom';
import UserForm from '../../components/UserForm';
import { Container, Description, Title } from './styles';
import useRegister from './useRegister';


export default function Register(): JSX.Element {
  const {
    handleSubmit
  } = useRegister();

  return (
    <Container>
      <Title>Seja bem-vindo à Marmeasy</Title>

      <Description>Digite um email e senha de sua preferência</Description>

      <UserForm onSubmit={handleSubmit} buttonLabel='Registrar conta' />

      <Link
        to='/login'
      >
        Já possuo uma conta.
      </Link>
    </Container>
  );
}
