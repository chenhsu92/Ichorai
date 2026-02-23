import React from 'react';

function Logo({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28">
      <polygon points="14,2 26,26 2,26" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <polygon points="14,8 20,22 8,22" fill="currentColor"/>
    </svg>
  );
}

export default Logo;