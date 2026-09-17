// EightracerLogo — replicates the chain-link logo (pink + blue rings)
// Usage: <EightracerLogo size={40} />

interface EightracerLogoProps {
  size?: number;
  className?: string;
  /** Show with the dark rounded background (like app icon). Default: false */
  withBackground?: boolean;
}

export function EightracerLogo({
  size = 40,
  className = "",
  withBackground = false,
}: EightracerLogoProps) {
  const inner = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Eightracer logo"
    >
      {/* ── Pink ring (top) ── */}
      <circle
        cx="40"
        cy="28"
        r="16"
        stroke="url(#pinkGrad)"
        strokeWidth="10"
        fill="none"
      />
      {/* ── Blue ring (bottom) ── */}
      <circle
        cx="40"
        cy="52"
        r="16"
        stroke="url(#blueGrad)"
        strokeWidth="10"
        fill="none"
      />
      {/* ── Overlap mask: blue over pink on the left half ── */}
      <clipPath id="leftHalf">
        <rect x="0" y="0" width="40" height="80" />
      </clipPath>
      <circle
        cx="40"
        cy="52"
        r="16"
        stroke="url(#blueGrad)"
        strokeWidth="10"
        fill="none"
        clipPath="url(#leftHalf)"
      />
      {/* ── Overlap mask: pink over blue on the right half ── */}
      <clipPath id="rightHalf">
        <rect x="40" y="0" width="40" height="80" />
      </clipPath>
      <circle
        cx="40"
        cy="28"
        r="16"
        stroke="url(#pinkGrad)"
        strokeWidth="10"
        fill="none"
        clipPath="url(#rightHalf)"
      />

      {/* ── Gradient definitions ── */}
      <defs>
        <linearGradient id="pinkGrad" x1="24" y1="12" x2="56" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f472b6" />
          <stop offset="100%" stopColor="#c084fc" />
        </linearGradient>
        <linearGradient id="blueGrad" x1="24" y1="36" x2="56" y2="68" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
    </svg>
  );

  if (withBackground) {
    return (
      <div
        style={{ width: size * 1.25, height: size * 1.25 }}
        className="rounded-2xl bg-[#131929] flex items-center justify-center flex-shrink-0"
      >
        {inner}
      </div>
    );
  }

  return inner;
}
