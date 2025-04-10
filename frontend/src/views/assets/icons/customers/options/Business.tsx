import { cn } from '@app/lib/utils';

interface IBusinessProps {
  className?: string;
}

export function Business({ className }: IBusinessProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={cn('size-6 text-gray-800', className)}
    >
      <g
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.091"
      >
        <path d="m2.98 6.493 5.723-3.695a.51.51 0 0 1 .552 0l5.725 3.695a.51.51 0 0 1 .232.428v.401a.51.51 0 0 1-.51.51H3.257a.51.51 0 0 1-.51-.51v-.401a.51.51 0 0 1 .234-.428ZM8.98 5.695V5.7" />
        <path
          d="m15.231 14.85-.27-1.226a.356.356 0 0 0-.348-.28H3.344a.356.356 0 0 0-.348.28l-.27 1.226a.356.356 0 0 0 .348.433h11.81c.227 0 .396-.211.347-.433Z"
          clipRule="evenodd"
        />
        <path d="M10.554 7.83v5.515m3.152-5.515v5.515M4.25 7.83v5.515M7.4 7.83v5.515" />
      </g>
    </svg>
  );
}
