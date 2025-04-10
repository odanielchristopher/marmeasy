import { SVG_STROKE } from '@app/config/constants';
import { cn } from '@app/lib/utils';

interface IIndividualProps {
  className?: string;
}

export function Individual({ className }: IIndividualProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={cn('size-6 text-gray-800', className)}
    >
      <path
        fill="currentColor"
        d="M9 3.563a1.688 1.688 0 1 0 0 3.375 1.688 1.688 0 0 0 0-3.375ZM6.187 5.25a2.813 2.813 0 1 1 5.626 0 2.813 2.813 0 0 1-5.626 0Zm.798 4.364c.1.074.227.16.38.245.384.218.948.443 1.634.443.686 0 1.251-.225 1.636-.442.152-.086.28-.172.379-.246.14.038.28.08.419.125l.72.236c.54.178.948.609 1.093 1.142l.298 2.148c.056.408-.157.704-.454.775-.785.188-2.11.398-4.09.398s-3.305-.21-4.09-.398c-.297-.07-.51-.367-.455-.775l.298-2.148a1.672 1.672 0 0 1 1.094-1.142l.72-.236c.138-.045.277-.087.418-.125Zm.533-1.016L7.3 8.383l-.302.069c-.263.06-.524.133-.783.218l-.72.236a2.79 2.79 0 0 0-1.84 1.962l-.008.03-.306 2.213c-.12.873.347 1.794 1.308 2.023.878.21 2.29.428 4.35.428 2.062 0 3.473-.218 4.351-.427.962-.23 1.43-1.151 1.309-2.024l-.307-2.212-.008-.03a2.79 2.79 0 0 0-1.84-1.963l-.72-.236a8.662 8.662 0 0 0-.783-.217l-.301-.07-.218.214v.001a2.25 2.25 0 0 1-.397.281 2.22 2.22 0 0 1-1.085.298 2.22 2.22 0 0 1-1.084-.298 2.406 2.406 0 0 1-.398-.281Z"
        strokeWidth={SVG_STROKE}
      />
    </svg>
  );
}
