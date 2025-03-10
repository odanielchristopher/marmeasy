interface UtensilsIconProps {
  size?: number;
}

export function UtensilsIcon({ size = 24 }: UtensilsIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 25 25"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.3604 4.40437C18.3594 3.88187 18.0413 3.55106 17.6209 3.68436C17.3563 3.76803 14.2408 5.85606 14.6047 13.349C14.664 14.1265 15.0017 14.6509 15.5806 15.0508C16.1488 15.4429 16.2986 15.9372 16.2432 16.5969C16.1128 18.1556 16.0233 18.7705 15.9357 20.3331C15.8919 21.1212 16.4728 21.6943 17.2337 21.6525C17.8914 21.6165 18.3594 21.0794 18.3604 20.3312C18.3643 17.4784 18.3643 6.10125 18.3604 4.40437Z"
        stroke="CurrentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.7103 4.0293C11.7755 5.48975 11.8465 6.94923 11.9049 8.40968C11.9429 9.35542 11.6189 10.1688 10.9105 10.7964C9.94147 11.6536 9.70309 12.7093 9.83445 13.9615C10.0757 16.2714 10.2528 17.6413 10.4172 19.958C10.4834 20.8882 9.64763 21.6549 8.80016 21.6549C7.95172 21.6549 7.11592 20.8882 7.18209 19.958C7.3475 17.6413 7.52361 16.2714 7.76491 13.9615C7.89626 12.7093 7.65788 11.6536 6.68878 10.7964C5.98045 10.1688 5.65645 9.35542 5.69439 8.40968C5.75277 6.94923 5.8238 5.48975 5.88899 4.0293"
        stroke="CurrentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.79492 7.57077L8.80465 4.10596"
        stroke="CurrentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
