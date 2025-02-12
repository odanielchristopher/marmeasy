interface ExpenseIconProps {
  size?: number;
}

export function ExpenseIcon({ size = 24 }: ExpenseIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 42 42"
      fill="none"
    >
      <path
        d="M23.2034 32.1084H11.2381C7.93457 32.1084 5.87988 29.7776 5.87988 26.4789V14.0495C5.87988 10.7509 7.93457 8.41992 11.2364 8.41992H30.7634C34.0553 8.41992 36.1199 10.7509 36.1199 14.0495V17.4069"
        stroke="CurrentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.2773 14.2998H13.6344"
        stroke="CurrentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.1582 20.2657C17.1582 18.1425 18.8794 16.4229 21.0011 16.4229C23.1244 16.4229 24.8457 18.1425 24.8457 20.2657C24.8457 22.3891 23.1244 24.1087 21.0011 24.1087C18.8794 24.1087 17.1582 22.3891 17.1582 20.2657Z"
        stroke="CurrentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28.9414 28.521L32.5309 32.1105L36.1189 28.521"
        stroke="CurrentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M32.5303 23.625V32.1085"
        stroke="CurrentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
