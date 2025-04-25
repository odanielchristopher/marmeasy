import { cn } from '@app/lib/utils';

interface IBusinessProps {
  className?: string;
  color?: string;
}

export function Business({ className, color }: IBusinessProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={cn('size-6', className)}
      fill="none"
      viewBox="0 0 28 28"
    >
      <g
        stroke={color ?? 'currentColor'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.4"
      >
        <path d="m4.342 9.978 9.182-5.928a.818.818 0 0 1 .886 0l9.183 5.928a.82.82 0 0 1 .373.687v.644c0 .45-.366.816-.818.816H4.785a.817.817 0 0 1-.817-.816v-.644c0-.278.141-.536.374-.687ZM13.967 8.698v.01" />
        <path
          d="m23.996 23.384-.433-1.966a.572.572 0 0 0-.558-.448H4.927c-.268 0-.5.186-.558.448l-.433 1.966a.572.572 0 0 0 .558.694h18.945a.57.57 0 0 0 .557-.694Z"
          clipRule="evenodd"
        />
        <path d="M16.113 12v8.847M21.17 12v8.847M6 12v8.847M11.056 12v8.847" />
      </g>
    </svg>
  );
}
