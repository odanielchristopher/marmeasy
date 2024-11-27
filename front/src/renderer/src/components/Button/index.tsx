import Spinner from '../Spinner';
import { IButton } from './interface';
import { StyledButton } from './styles';

export default function Button({
  type,
  disabled,
  isLoading,
  children,
  danger,
  onClick,
}: IButton) {
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
