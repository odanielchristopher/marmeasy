import { cn } from '@app/lib/utils';

interface ICreditProps {
  className?: string;
}

export function Card({ className }: ICreditProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={cn('size-6 text-gray-800', className)}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.0351 4.53906H6.96389C4.52757 4.53906 3 6.26414 3 8.70533V15.2933C3 17.7355 4.51978 19.4596 6.96389 19.4596H17.0342C19.4792 19.4596 21 17.7355 21 15.2933V8.70533C21 6.26414 19.4792 4.53906 17.0351 4.53906Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 9.83414H21"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.17676 15.1701H10.1453"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
