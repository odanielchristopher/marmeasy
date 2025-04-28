import {
  ChefHatIcon,
  PencilIcon,
  PlusCircleIcon,
  Trash2Icon,
} from 'lucide-react';

import { ingredients } from '@app/mocks/ingredients';
import { capitalizeFirstLetter } from '@app/utils/capitalizeFirstLetter';
import { Button } from '@views/components/ui/Button';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderRow,
  TableRow,
} from '@views/components/ui/Table';

export function Ingredients() {
  return (
    <div className="pt-3 w-full">
      <header className="mb-5 flex gap-3 items-center">
        <div className="flex items-center justify-center p-3 border border-gray-300 dark:border-accent bg-white dark:bg-card rounded-sm">
          <ChefHatIcon />
        </div>
        <h4 className="text-xl font-medium tracking-[-0.5px]">Ingredientes</h4>
      </header>

      <div>
        <Button type="button" variant="outline" className="h-[42px] bg-white">
          <PlusCircleIcon />
          Novo ingrediente
        </Button>
      </div>

      <Table className="w-full mt-5">
        <TableHeader>
          <TableRow>
            <TableHeaderRow className="w-[5%]">Emoji</TableHeaderRow>
            <TableHeaderRow>Nome</TableHeaderRow>
            <TableHeaderRow className="w-[12%]">Ações</TableHeaderRow>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ingredients.map((ingredient) => (
            <TableRow key={ingredient.id}>
              <TableCell className="text-center">{ingredient.icon}</TableCell>
              <TableCell>{capitalizeFirstLetter(ingredient.name)}</TableCell>
              <TableCell className="flex gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  className="p-3 size-12"
                  onClick={() => console.log('Editar', ingredient)}
                >
                  <PencilIcon className="size-4.5 text-primary" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="p-3 size-12"
                  onClick={() => console.log('Remover', ingredient)}
                >
                  <Trash2Icon className="size-4.5 text-destructive" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
