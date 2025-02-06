interface CashIconProps {
  size?: number;
}

export function CashIcon({ size = 36 }: CashIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none">
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M18.027 28.84c5.523 0 10-4.477 10-10 0-5.522-4.477-10-10-10s-10 4.478-10 10c0 5.523 4.478 10 10 10Z"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M23.027 13.34h-7.5a2.39 2.39 0 0 0-1.767.806 2.895 2.895 0 0 0-.733 1.944c0 .73.264 1.43.733 1.945a2.39 2.39 0 0 0 1.767.805h5c.663 0 1.3.29 1.768.806.469.515.732 1.215.732 1.944 0 .73-.263 1.43-.732 1.945a2.39 2.39 0 0 1-1.768.805h-7.5M18.027 26.34v-15"
      />
    </svg>
  );
}
