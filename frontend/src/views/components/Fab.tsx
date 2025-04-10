import { Plus } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/DropdownMenu';

export function Fab() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="fixed bottom-0 md:bottom-4 right-4 text-white bg-teal-900 rounded-full p-3"
        >
          <Plus className="size-6" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
