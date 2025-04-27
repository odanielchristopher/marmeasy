import { ReceiptTextIcon } from 'lucide-react';
import { Suspense } from 'react';
import { Navigate } from 'react-router';

import { PageHeader } from '@views/components/app/PageHeader';
import { Skeleton } from '@views/components/ui/Skeleton';

import { Aside } from './components/Aside';
import { useMenuController } from './useMenuController';

export function Menu() {
  const { findedSession, currentSession } = useMenuController();

  if (!findedSession || !currentSession) {
    return <Navigate to="/menu?session=products" />;
  }

  const { comp: Session } = findedSession;

  return (
    <div className="h-full pt-7 px-4 md:px-6">
      <PageHeader
        title="Cardápio"
        description="Escolha e organize seu cardápio"
        icon={ReceiptTextIcon}
      />

      <main className="w-full pb-12 flex gap-8 pt-11 md:pt-8">
        <Aside currentSession={currentSession} />

        <Suspense fallback={<Skeleton className="w-full h-[500px]" />}>
          <Session />
        </Suspense>
      </main>
    </div>
  );
}
