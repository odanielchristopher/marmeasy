import { NotFoundImage } from '@views/assets/imgs/NotFoundImage';
import { Button } from '@views/components/ui/Button';

export function InternalServerError() {
  function reloadWindow() {
    window.location.reload();
  }

  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="flex flex-col w-full max-w-[400px]">
        <NotFoundImage
          type="internal-error"
          alt="Erro interno do sistema"
          className=""
        />

        <span className="text-base tracking-[-0.5px] text-center">
          <b>Ocorreu um erro desconhecido!</b> Por favor, <b>aperte o botão</b>{' '}
          abaixo ou tente novamente mais tarde.
        </span>

        <Button type="button" className="mt-6" onClick={reloadWindow}>
          Tentar novamente
        </Button>
      </div>
    </div>
  );
}
