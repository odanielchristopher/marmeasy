export function ImageIcon({ color }: { color: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.5 21H6.5C4.843 21 3.5 19.657 3.5 18V6C3.5 4.343 4.843 3 6.5 3H18.5C20.157 3 21.5 4.343 21.5 6V18C21.5 19.657 20.157 21 18.5 21Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.5 17.486L8.112 12.874C8.503 12.483 9.136 12.483 9.526 12.874L10.932 14.28L15.509 9.70402C15.9 9.31302 16.533 9.31302 16.923 9.70402L21.5 14.281"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.01517 7.40683C9.16161 7.55328 9.16161 7.79072 9.01517 7.93716C8.86872 8.08361 8.63128 8.08361 8.48483 7.93716C8.33839 7.79072 8.33839 7.55328 8.48483 7.40683C8.63128 7.26039 8.86872 7.26039 9.01517 7.40683"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
