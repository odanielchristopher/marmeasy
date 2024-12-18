import { ComponentProps } from 'react';
import Spinner from '../Spinner';
import { StyledButton } from './styles';

interface ButtonProps extends ComponentProps<'button'> {
  isLoading?: boolean;
  danger?: boolean;
}

export default function Button({
  type,
  disabled,
  isLoading,
  children,
  danger,
  onClick,
}: ButtonProps) {
  return (
    <StyledButton
      type={type}
      disabled={disabled || isLoading}
      $danger={danger}
      onClick={onClick}
    >
      {!isLoading && children}
      {isLoading && <Spinner size={16} />}
    </StyledButton>
  );
}
