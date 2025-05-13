import { cn } from '@app/lib/utils';
import { NotFoundImage } from '@views/assets/imgs/NotFoundImage';
import { imageMap } from '@views/assets/imgs/NotFoundImage/imageMap';

interface INotFoundErrorProps {
  image?: {
    type?: keyof typeof imageMap;
    alt?: string;
  };
  message: string;
  classNames?: {
    root?: string;
    content?: string;
    message?: string;
    image?: string;
  };
}

export function NotFoundError({
  message,
  image,
  classNames,
}: INotFoundErrorProps) {
  return (
    <div className={cn('flex-1 grid place-items-center', classNames?.root)}>
      <div className={cn('flex flex-col', classNames?.content)}>
        <NotFoundImage
          type={image?.type || 'search'}
          alt={image?.alt}
          className={classNames?.image}
        />

        <span
          className={cn('text-base tracking-[-0.5px]', classNames?.message)}
        >
          {message}
        </span>
      </div>
    </div>
  );
}
