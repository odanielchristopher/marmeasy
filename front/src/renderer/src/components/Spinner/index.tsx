import { ISpinner } from './interface';
import { StyledSpinner } from './styles';

export default function Spinner({ size }: ISpinner): JSX.Element {
  return <StyledSpinner size={size} />;
}
