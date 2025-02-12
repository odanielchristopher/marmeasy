interface IncomeIconProps {
  size?: number;
}

export function IncomeIcon({ size = 24 }: IncomeIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 42 42"
      fill="none"
    >
      <path
        d="M23.2043 32.1079H11.2391C7.93555 32.1079 5.88086 29.7771 5.88086 26.4784V14.049C5.88086 10.7504 7.93555 8.41943 11.2374 8.41943H30.7643C34.0563 8.41943 36.1209 10.7504 36.1209 14.049V17.4064"
        stroke="CurrentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28.9424 27.214L32.5319 23.6245L36.1198 27.214"
        stroke="CurrentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M32.5312 23.6245L32.5315 32.108"
        stroke="CurrentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.2783 14.3018H13.6354"
        stroke="CurrentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.1553 20.2647C17.1553 18.1415 18.8765 16.4219 20.9982 16.4219C23.1216 16.4219 24.8427 18.1415 24.8427 20.2647C24.8427 22.3881 23.1216 24.1077 20.9982 24.1077C18.8765 24.1077 17.1553 22.3881 17.1553 20.2647Z"
        stroke="CurrentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
