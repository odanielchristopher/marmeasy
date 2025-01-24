import * as RdxPopover from '@radix-ui/react-popover';

function PopoverRoot({ children }: { children: React.ReactNode }) {
    return (
        <RdxPopover.Root>
            {children}
        </RdxPopover.Root>
    );
}

function PopoverTrigger({ children }: { children: React.ReactNode }) {
    return (
        <RdxPopover.Trigger asChild>
            {children}
        </RdxPopover.Trigger>
    );
}

interface PopoverContentProps {
    children: React.ReactNode;
    className?: string;
}

function PopoverContent({ children, className }: PopoverContentProps) {
    return (
        <RdxPopover.Portal>
            <RdxPopover.Content className={className}>
                {children}
            </RdxPopover.Content>
        </RdxPopover.Portal>
    );
}

export const Popover = {
    Root: PopoverRoot,
    Trigger: PopoverTrigger,
    Content: PopoverContent,
};
