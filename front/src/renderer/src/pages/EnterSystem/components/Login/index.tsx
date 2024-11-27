import Button from '@renderer/components/Button';
import Input from '@renderer/components/Input';
import { ButtonContainer, Container } from './styles';

export default function Login(): JSX.Element {
    return (
      <Container>
        <h1>Entrar no sistema</h1>

        <p>Entre com seu e-mail e senha</p>

        <Input
          type="email"
          placeholder="E-mail"
        />

        <Input
          type="password"
          placeholder="Senha"
        />

        <ButtonContainer>
          <Button
            type="submit"
            onClick={() => console.log('entrei')}
          >
            Entrar
          </Button>
        </ButtonContainer>
      </Container>
    );
}
