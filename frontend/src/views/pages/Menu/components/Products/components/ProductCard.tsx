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
  onClick(): void;
}

export function ProductCard({ onClick, ...product }: IProductCardProps) {
  return (
    <div
      role="button"
      className="bg-white dark:bg-card border border-gray-300 dark:border-accent p-3 rounded-xl flex gap-3 sm:flex-col lg:flex-row cursor-pointer hover:!border-primary hover:scale-[102%] transition-all"
      onClick={onClick}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          onClick();
        }
      }}
    >
      <div className="max-sm:min-w-34 max-sm:h-28 h-40 lg:h-34 lg:min-w-34 xl:min-w-44">
        <Avatar className="size-full rounded-sm">
          <AvatarImage src={product.imagePath} className="object-cover" />
          <AvatarFallback className="bg-teal-900 rounded-sm">
            <SoupIcon />
          </AvatarFallback>
        </Avatar>
      </div>

      <div className="min-h-24 flex flex-col justify-between max-sm:py-3 lg:py-3">
        <div>
          <strong className="text-base font-semibold tracking-[-0.5px]">
            {product.name}
          </strong>

          <p className="text-sm text-muted-foreground tracking-[-0.5px]">
            {product.description}
          </p>
        </div>

        <strong className="text-base font-semibold tracking-[-0.5px]">
          {formatCurrency(product.price)}
        </strong>
      </div>
    </div>
  );
}
