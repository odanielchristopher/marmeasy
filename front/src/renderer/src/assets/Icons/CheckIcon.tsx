interface CheckIconProps {
  width?: number;
  height?: number;
}

export function CheckIcon({ width = 22, height = 21 }: CheckIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
    >
      <path
        d="M30.1663 14L26.913 10.28L27.3663 5.36L22.553 4.26667L20.033 0L15.4997 1.94667L10.9663 0L8.44634 4.25333L3.63301 5.33333L4.08634 10.2667L0.833008 14L4.08634 17.72L3.63301 22.6533L8.44634 23.7467L10.9663 28L15.4997 26.04L20.033 27.9867L22.553 23.7333L27.3663 22.64L26.913 17.72L30.1663 14ZM12.953 20.2933L7.88634 15.2133L9.85967 13.24L12.953 16.3467L20.753 8.52L22.7263 10.4933L12.953 20.2933Z"
        fill="CurrentColor"
      />
    </svg>
  );
}
