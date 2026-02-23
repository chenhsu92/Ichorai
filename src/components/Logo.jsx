import React from 'react';

function Logo({ size = 24, color = "currentColor", title = "Ichorai Logo" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      {/* The main flowing vessel conduit */}
      <path
        d="M14 2 C 14 2, 24 9, 24 16 C 24 22, 19 26, 14 26 C 9 26, 4 22, 4 16 C 4 9, 12 4, 14 8 C 15.5 11, 14 13, 14 17"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* The concentrated essence point */}
      <circle cx="14" cy="20.5" r="2" fill={color} />
    </svg>
  );
}

export default Logo;