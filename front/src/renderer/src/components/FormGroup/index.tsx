import Spinner from '../Spinner';
import { Container } from './styles';

interface FormGroupProps {
  children: JSX.Element
  error?: string
  isLoading?: boolean
}

export default function FormGroup({ children, error, isLoading }: FormGroupProps) {
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
