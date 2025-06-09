import { BoxIcon, ReceiptTextIcon, SoupIcon } from 'lucide-react';
import { Suspense } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router';

import { routes } from '@app/Router/routes';
import { Aside } from '@views/components/app/Aside';
import { PageHeader } from '@views/components/app/PageHeader';
import { Skeleton } from '@views/components/ui/Skeleton';

export function MenuLayout() {
  const { pathname: currentPathname } = useLocation();

  const navigate = useNavigate();

  const sessions = [
    {
      id: `${routes.menu}/products`,
      label: 'Produtos',
      icon: SoupIcon,
      handler: () => navigate('/menu/products'),
    },
    {
      id: `${routes.menu}/categories`,
      label: 'Categorias',
      icon: BoxIcon,
      handler: () => navigate('/menu/categories'),
    },
  ];

  if (currentPathname === '/menu') {
    return <Navigate to={`${routes.menu}/products`} />;
  }

  return (
    <div className="h-full pt-7 px-4 md:px-6">
      <PageHeader
        title="Cardápio"
        description="Escolha e organize seu cardápio"
        icon={ReceiptTextIcon}
      />

      <main className="w-full pb-6 flex gap-4 md:gap-0 pt-11 md:pt-8 max-md:flex-col">
        <Aside
          title="Sessões"
          currentSession={currentPathname}
          sessions={sessions}
        />

        <Suspense
          fallback={<Skeleton className="w-full h-140 rounded-2xl md:ml-8" />}
        >
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}
