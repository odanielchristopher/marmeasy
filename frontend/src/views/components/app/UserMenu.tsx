import { ChevronDown, LogOut } from 'lucide-react';
import { useShallow } from 'zustand/shallow';

import { SVG_STROKE } from '@app/config/constants';
import { useAuth } from '@app/hooks/useAuth';
import { useGlobalStore } from '@app/store';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@views/components/ui/DropdownMenu';

export function UserMenu() {
  const { signout } = useAuth();
  const { user } = useGlobalStore(
    useShallow((store) => ({
      user: store.user.data,
    })),
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="outline-none max-md:hidden border-2 border-transparent focus:border-ring"
      >
        <button
          type="button"
          className="flex items-center text-white p-1 rounded-full hover:bg-[#DEE2E6]/20 gap-2 md:gap-0 peer"
        >
          <span className="font-medium tracking-[-0.5px] p-2 bg-teal-900 dark:bg-primary rounded-full text-[10px] transition-colors">
            {user?.name.slice(0, 2).toUpperCase()}
          </span>

          <ChevronDown className="block size-6" strokeWidth={SVG_STROKE} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="!shadow-default space-y-2 px-2 py-2.5 border-transparent dark:border-muted max-md:dark:bg-muted"
      >
        <DropdownMenuItem
          className="cursor-pointer !text-gray-800 dark:!text-foreground flex justify-between"
          onSelect={signout}
        >
          <span className="text-base text-gray-800 dark:text-foreground tracking-[-0.5px]">
            Sair
          </span>
          <LogOut className="size-5" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
