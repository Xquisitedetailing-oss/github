interface Props {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Logo({ size = "md", className = "" }: Props) {
  const heights: Record<string, number> = { sm: 28, md: 40, lg: 56 };
  const h = heights[size];

  return (
    <svg
      height={h}
      viewBox="0 0 320 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Xquisite Car Detailing"
    >
      {/* X - brand blue */}
      <text
        x="0"
        y="62"
        fontFamily="Arial Black, Arial, sans-serif"
        fontWeight="900"
        fontStyle="italic"
        fontSize="72"
        fill="#29ABE2"
      >
        x
      </text>
      {/* quisite - white */}
      <text
        x="52"
        y="62"
        fontFamily="Arial Black, Arial, sans-serif"
        fontWeight="900"
        fontStyle="italic"
        fontSize="72"
        fill="#ffffff"
      >
        quisite
      </text>
      {/* CAR · DETAILING - small caps below */}
      <text
        x="52"
        y="78"
        fontFamily="Arial, sans-serif"
        fontWeight="700"
        fontSize="13"
        letterSpacing="3"
        fill="rgba(255,255,255,0.6)"
      >
        CAR · DETAILING
      </text>
    </svg>
  );
}
