import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router';

import { routes } from '@app/Router/routes';
import { NotFoundImage } from '@views/assets/imgs/NotFoundImage';
import { Button } from '@views/components/ui/Button';

export function NotFoundPage() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
      <NotFoundImage
        className="w-full max-w-[300px] md:max-w-[400px]"
        alt="404"
      />

      <span className="text-gray-800 dark:text-foreground tracking-[-0.5px]">
        Página não encontrada!
      </span>

      <Button variant="link" type="button" asChild>
        <Link to={routes.login}>
          <ChevronLeft />
          <span>Volta para a página inicial</span>
        </Link>
      </Button>
    </div>
  );
}
