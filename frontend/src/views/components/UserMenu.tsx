import { ChevronDown, LogOut } from 'lucide-react';

import { SVG_STROKE } from '@app/config/constants';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/DropdownMenu';

export function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="outline-none max-md:hidden">
        <button
          type="button"
          className="flex items-center text-white p-1 rounded-full hover:bg-[#DEE2E6]/20 gap-2 md:gap-0 peer"
        >
          <span className="font-medium tracking-[-0.5px] p-2 bg-teal-900 rounded-full text-[10px]">
            DC
          </span>

          <ChevronDown className="block size-6" strokeWidth={SVG_STROKE} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="!shadow-default space-y-2 px-2 py-2.5 border-transparent dark:border-muted max-md:dark:bg-muted"
      >
        <DropdownMenuItem className="cursor-pointer !text-gray-800 dark:!text-foreground flex justify-between">
          <span className="text-base text-gray-800 dark:text-foreground tracking-[-0.5px]">
            Sair
          </span>
          <LogOut className="size-5" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
