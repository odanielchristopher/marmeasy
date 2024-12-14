import * as RdxDropdownMenu from '@radix-ui/react-dropdown-menu';

import {
  StyledRdxDropdownMenuContent,
  StyledRdxDropdownMenuItem,
  StyledRdxDropdownMenuTrigger,
} from './styles';

function DropdownMenuRoot({ children }: { children: React.ReactNode}) {
  return (
    <RdxDropdownMenu.Root>
      {children}
    </RdxDropdownMenu.Root>
  );
}

interface DropdownMenuTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

function DropdownMenuTrigger({ children, asChild }: DropdownMenuTriggerProps) {
  return (
    <StyledRdxDropdownMenuTrigger asChild={asChild}>
      {children}
    </StyledRdxDropdownMenuTrigger>
  );
}

interface DropdownMenuContentProps {
  children: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  sideOffset?: number;
  align?: 'center' | 'start' | 'end';
}

function DropdownMenuContent({ children, side, sideOffset, align }: DropdownMenuContentProps) {
  return (
    <RdxDropdownMenu.Portal>
      <StyledRdxDropdownMenuContent side={side} sideOffset={sideOffset} align={align}>
        {children}
      </StyledRdxDropdownMenuContent>
    </RdxDropdownMenu.Portal>
  );
}

interface DropdownMenuItemProps {
  children: React.ReactNode;
  onSelected?(): void;
  asChild?: boolean;
}

function DropdownMenuItem({ children, onSelected, asChild }: DropdownMenuItemProps) {
  return (
    <StyledRdxDropdownMenuItem
      onSelect={onSelected}
      asChild={asChild}
    >
      {children}
    </StyledRdxDropdownMenuItem>
  );
}

export const DropdownMenu = {
  Root: DropdownMenuRoot,
  Trigger: DropdownMenuTrigger,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem,
};
