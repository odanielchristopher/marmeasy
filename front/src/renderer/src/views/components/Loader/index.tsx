import Spinner from '../Spinner';
import { Overlay } from './styles';

interface LoaderProps {
  $isLoading: boolean;
  size: number;
}

export default function Loader({ $isLoading, size }: LoaderProps) {
  return (
    <Overlay $isLeaving={!$isLoading}>
      <Spinner size={size} />
    </Overlay>
  );
}
