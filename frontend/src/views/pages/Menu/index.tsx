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

      <main className="w-full pb-6 flex gap-4 md:gap-0 pt-11 md:pt-8 max-md:flex-col">
        <Aside currentSession={currentSession} />

        <Suspense
          fallback={
            <div className="w-full max-md:pt-4 md:pl-8">
              <Skeleton className="w-full md:pl8 h-[500px] rounded-xl" />
            </div>
          }
        >
          <Session />
        </Suspense>
      </main>
    </div>
  );
}
