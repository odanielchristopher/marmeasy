import { SoupIcon } from 'lucide-react';

import { formatCurrency } from '@app/utils/formatCurrency';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@views/components/ui/Avatar';

interface IProductCardProps {
  id: string;
  name: string;
  price: number;
  description?: string;
  imagePath?: string;
  isDisabled?: boolean;
}

export function ProductCard({ isDisabled, ...product }: IProductCardProps) {
  return (
    <div className="bg-white dark:bg-card border border-gray-300 dark:border-accent p-3 rounded-sm flex gap-3 flex-col lg:flex-row">
      <div className="h-40 lg:min-h-30 lg:min-w-34 xl:min-w-44">
        <Avatar className="size-full rounded-sm">
          <AvatarImage src={product.imagePath} className="object-cover" />
          <AvatarFallback className="bg-teal-900 rounded-sm">
            <SoupIcon />
          </AvatarFallback>
        </Avatar>
      </div>

      <div className="min-h-24 flex flex-col justify-between">
        <div>
          <strong>{product.name}</strong>

          <p>{product.description}</p>
        </div>

        <strong>{formatCurrency(product.price)}</strong>
      </div>
    </div>
  );
}
