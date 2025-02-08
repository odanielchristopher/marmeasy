import { ComponentProps } from 'react';
import Spinner from '../Spinner';
import { StyledButton } from './styles';

export interface ButtonProps extends ComponentProps<'button'> {
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
  ...props
}: ButtonProps) {
  return (
    <StyledButton
      type={type}
      disabled={disabled || isLoading}
      $danger={danger}
      onClick={onClick}
      {...props}
    >
      {!isLoading && children}
      {isLoading && <Spinner size={16} />}
    </StyledButton>
  );
}
