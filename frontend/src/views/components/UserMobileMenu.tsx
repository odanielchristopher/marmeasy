import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { LogOut, Menu, X } from 'lucide-react';
import { Link } from 'react-router';

import { SVG_STROKE } from '@app/config/constants';
import { cn } from '@app/lib/utils';

import { navItems } from './AppNavigation';

interface IUserMobileMenuProps {
  currentPathname: string;
}

export function UserMobileMenu({ currentPathname }: IUserMobileMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="outline-none min-md:hidden">
        <button
          type="button"
          className="group flex items-center text-white p-1 rounded-full hover:bg-[#DEE2E6]/20 gap-2 min-md:hidden"
        >
          <span className="font-medium tracking-[-0.5px] p-2 bg-teal-900 rounded-full text-[10px]">
            DC
          </span>

          <div className="relative grid size-7 place-items-center">
            <Menu
              className="absolute transition-all size-5
               group-data-[state=open]:-rotate-90
               group-data-[state=open]:scale-0
               rotate-0 scale-100"
              strokeWidth={SVG_STROKE}
            />
            <X
              className="absolute transition-all size-5
               group-data-[state=open]:rotate-0
               group-data-[state=open]:scale-100
               -rotate-90 scale-0"
              strokeWidth={SVG_STROKE}
            />
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className={cn(
          'bg-primary w-screen rounded-none mt-4 py-6 px-4 flex flex-col gap-6',
          'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          'duration-300',
          'shadow-default',
          'border-b-2 border-transparent dark:border-accent dark:bg-background',
        )}
      >
        <DropdownMenuGroup className="space-y-3">
          {navItems.map(({ label, pathname, icon: Icon }) => (
            <DropdownMenuItem asChild key={pathname}>
              <Link
                className={cn(
                  'border border-transparent px-6 py-4 !rounded-full w-full !text-white !text-base tracking-[-0.5px] flex items-center gap-2 hover:!bg-[#DEE2E6]/20 hover:!border-[#DEE2E6]/20',
                  currentPathname === pathname &&
                    'border !border-white bg-[#DEE2E6]/20',
                )}
                to={pathname}
              >
                <Icon className="size-6" />
                <span>{label}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuItem className="cursor-pointer border border-transparent px-6 py-4 !rounded-full w-full !text-white !text-base tracking-[-0.5px] flex items-center gap-2 hover:!bg-[#DEE2E6]/20 hover:!border-[#DEE2E6]/20">
          <LogOut />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
