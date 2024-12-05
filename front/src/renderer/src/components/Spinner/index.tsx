import { StyledSpinner } from './styles';

export interface SpinnerProps {
  size: number
}


export default function Spinner({ size }: SpinnerProps): JSX.Element {
  return <StyledSpinner size={size} />;
}
