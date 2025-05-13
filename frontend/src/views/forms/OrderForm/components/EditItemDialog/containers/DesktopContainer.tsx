import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@radix-ui/react-dialog';
import { SoupIcon, XIcon } from 'lucide-react';
import React from 'react';

import { cn } from '@app/lib/utils';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@views/components/ui/Avatar';

export function DesktopContainer({
  children,
  imagePath,
  onClose,
  ...props
}: {
  onClose?: () => void;
  imagePath?: string;
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<typeof Dialog>) {
  return (
    <Dialog {...props} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50 backdrop-blur-xs" />
        <DialogContent
          aria-describedby={undefined}
          className={cn(
            'bg-white dark:bg-card data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-3 rounded-lg border shadow-lg duration-200 sm:max-w-lg',
          )}
        >
          <DialogTitle asChild>
            <header className="w-full flex justify-end relative">
              <button
                type="button"
                className="absolute z-[100] top-4 right-4 flex items-center justify-center p-1.5 rounded-full bg-black/50 text-white"
                onClick={onClose}
              >
                <XIcon className="size-5" />
              </button>
              <div className="relative" />
              <Avatar className="rounded-none rounded-t-[11px] w-full h-44 stick">
                <AvatarImage
                  src={imagePath}
                  alt="Imagem ilustrativa do(a) Marmita Vegetariana"
                  className="w-full h-full flex items-center justify-center bg-teal-900 !rounded-md object-cover"
                />
                <AvatarFallback className="bg-teal-900 rounded-none">
                  <SoupIcon className="size-7 text-gray-800" />
                </AvatarFallback>
              </Avatar>
            </header>
          </DialogTitle>

          <div className="block px-4 pb-4">{children}</div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
