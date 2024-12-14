import { StyledSpinner } from './styles';

export interface SpinnerProps {
  size: number;
  color?: string;
}


export default function Spinner({ size, color }: SpinnerProps) {
  return <StyledSpinner size={size} color={color} />;
}
