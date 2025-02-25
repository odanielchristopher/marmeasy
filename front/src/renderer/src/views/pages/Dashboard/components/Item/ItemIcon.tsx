import { IconContainer, IconProps } from '../IconContainer';

interface ItemIconProps extends IconProps {
  children: React.ReactNode;
}

export function ItemIcon({ children, color, height }: ItemIconProps) {
  return (
    <IconContainer color={color} height={height}>
      {children}
    </IconContainer>
  );
}
