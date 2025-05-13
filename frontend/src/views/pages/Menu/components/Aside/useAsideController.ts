import { BoxIcon, SoupIcon } from 'lucide-react';
import { useSearchParams } from 'react-router';

export function useAsideController() {
  const [, setSearchParams] = useSearchParams();

  const sessions = [
    {
      id: 'products',
      label: 'Produtos',
      icon: SoupIcon,
      handler: () => setSearchParams({ session: 'products' }),
    },
    {
      id: 'categories',
      label: 'Categorias',
      icon: BoxIcon,
      handler: () => setSearchParams({ session: 'categories' }),
    },
  ];

  return {
    sessions,
  };
}
