interface CardIconProps {
  height?: number;
  width?: number;
}

export function CardIcon({ height = 25, width = 24 }: CardIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 25"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.0351 4.64746H6.96389C4.52757 4.64746 3 6.37254 3 8.81373V15.4017C3 17.8439 4.51978 19.568 6.96389 19.568H17.0342C19.4792 19.568 21 17.8439 21 15.4017V8.81373C21 6.37254 19.4792 4.64746 17.0351 4.64746Z"
        stroke="CurrentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 9.94238H21"
        stroke="CurrentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.17676 15.2783H10.1453"
        stroke="CurrentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
