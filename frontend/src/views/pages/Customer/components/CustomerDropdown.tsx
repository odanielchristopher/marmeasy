import { EllipsisVerticalIcon, PencilIcon, Trash2Icon } from 'lucide-react';

import { Button } from '@views/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@views/components/ui/DropdownMenu';

interface ICustomerDropdownProps {
  onUpdate(): void;
  onRemove(): void;
}

export function CustomerDropdown({
  onRemove,
  onUpdate,
}: ICustomerDropdownProps) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant="ghost" className="size-12">
          <EllipsisVerticalIcon className="size-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="p-2">
        <DropdownMenuItem
          className="text-gray-800 dark:text-foreground justify-between cursor-pointer px-3 py-2"
          onSelect={onUpdate}
        >
          <span>Editar</span>
          <PencilIcon className="size-4 text-gray-800 dark:text-foreground" />
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-gray-800 dark:text-foreground justify-between cursor-pointer px-3 py-2"
          onSelect={onRemove}
        >
          <span>Excluir</span>
          <Trash2Icon className="size-4 text-gray-800 dark:text-foreground" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
