import { Plus } from 'lucide-react';

import { cn } from '@app/lib/utils';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/DropdownMenu';

import { useFabController } from './useFabController';

export function Fab() {
  const { fabItems, isDropdownOpen, setIsDropdownOpen } = useFabController();

  return (
    <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="fixed bottom-4 right-4 text-white bg-teal-900 rounded-full p-3 outline-none"
          onClick={() => setIsDropdownOpen(true)}
        >
          <Plus className="size-6" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="!shadow-default space-y-2 px-2 py-2.5 bg-white dark:bg-popover border-transparent dark:border-accent"
      >
        {fabItems.map(({ label, icon: Icon, bgIcon, colorIcon, handler }) => (
          <DropdownMenuItem
            key={label}
            className="cursor-pointer"
            onSelect={handler}
          >
            <div
              className={cn(
                'flex items-center justify-center p-1.5 rounded-full',
                bgIcon,
              )}
            >
              <Icon className={cn('size-5', colorIcon)} />
            </div>

            <span className="text-sm text-gray-800 dark:text-foreground tracking-[-0.5px]">
              {label}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
