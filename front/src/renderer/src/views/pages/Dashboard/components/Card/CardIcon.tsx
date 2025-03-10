import { IconContainer, IconProps } from '../IconContainer';

interface CardIconProps extends IconProps {
  children: React.ReactNode;
}

export function CardIcon({ children, color, height }: CardIconProps) {
  return (
    <IconContainer color={color} height={height}>
      {children}
    </IconContainer>
  );
}
