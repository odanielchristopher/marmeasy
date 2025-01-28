import * as RdxPopover from '@radix-ui/react-popover';
import { StyledRdxPopoverContent, StyledRdxPopoverTrigger } from './styles';

function PopoverRoot({ children }: { children: React.ReactNode }) {
  return <RdxPopover.Root>{children}</RdxPopover.Root>;
}

interface PopoverTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

function PopoverTrigger({ children, asChild }: PopoverTriggerProps) {
  return (
    <StyledRdxPopoverTrigger asChild={asChild}>
      {children}
    </StyledRdxPopoverTrigger>
  );
}

interface PopoverContentProps {
  children: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  sideOffset?: number;
  align?: 'center' | 'start' | 'end';
  asChild?: boolean;
}

function PopoverContent({
  children,
  side,
  sideOffset,
  align,
  asChild,
}: PopoverContentProps) {
  return (
    <RdxPopover.Portal>
      <StyledRdxPopoverContent
        side={side}
        sideOffset={sideOffset}
        align={align}
        asChild={asChild}
      >
        {children}
      </StyledRdxPopoverContent>
    </RdxPopover.Portal>
  );
}

export const Popover = {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  Content: PopoverContent,
};
