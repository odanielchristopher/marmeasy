import Spinner from '../Spinner';
import { IFormGrup } from './interface';
import { Container } from './styles';

export default function FormGroup({ children, error, isLoading }: IFormGrup) {
  return (
    <Container>
      <div className="form-item">
        {children}

        {isLoading && (
          <div className="loader">
            <Spinner size={16} />
          </div>
        )}
      </div>
      {error && <small>{error}</small>}
    </Container>
  );
}
