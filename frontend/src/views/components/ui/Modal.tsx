import { X } from 'lucide-react';
import React from 'react';

import { cn } from '@app/lib/utils';

import { Dialog, DialogContent, DialogTitle } from './Dialog';

interface IModalProps {
  open: boolean;
  title: string;
  children: React.ReactNode;
  rightAction?: React.ReactNode;
  onClose?(): void;
}

export function Modal({
  title,
  open,
  children,
  rightAction,
  onClose,
}: IModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        aria-describedby={undefined}
        className={cn(
          'p-6 space-y-10 bg-white rounded-2xl z-[51] shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] w-full max-w-[400px] outline-none',
          'dark:bg-card',
        )}
      >
        <DialogTitle asChild>
          <header className="h-12 flex items-center justify-between text-gray-800 dark:text-card-foreground">
            <button
              type="button"
              onClick={onClose}
              className="h-12 w-12 flex items-center justify-center rounded-full outline-none"
            >
              <X className="w-6 h-6" />
            </button>

            <span className="text-lg text-gray-800 dark:text-foreground font-semibold tracking-[-1px]">
              {title}
            </span>

            <div className="h-12 w-12 flex items-center justify-center">
              {rightAction}
            </div>
          </header>
        </DialogTitle>

        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
}
