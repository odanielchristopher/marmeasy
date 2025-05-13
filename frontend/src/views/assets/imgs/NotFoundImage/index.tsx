import { imageMap } from './imageMap';

interface INotFoundImageProps {
  type?: keyof typeof imageMap;
  alt?: string;
  className?: string;
}

export function NotFoundImage({ type, alt, className }: INotFoundImageProps) {
  const path = imageMap[type ?? 'default'];

  return <img src={path} alt={alt} className={className} />;
}
