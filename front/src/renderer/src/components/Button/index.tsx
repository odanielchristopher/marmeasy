import Spinner from '../Spinner';
import { StyledButton } from './styles';

interface ButtonProps {
  type: string
  disabled?: boolean
  isLoading?: boolean
  children: JSX.Element | string
  danger?: boolean
  isForm?: boolean
  onClick?: () => void
}

export default function Button({
  type,
  disabled,
  isLoading,
  children,
  danger,
  onClick
}: ButtonProps) {
  return (
    <StyledButton
      type={type}
      disabled={disabled || isLoading}
      danger={danger}
      onClick={onClick}
    >
      {!isLoading && children}
      {isLoading && <Spinner size={16} />}
    </StyledButton>
  );
}
