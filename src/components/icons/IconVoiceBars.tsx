'use client';

import * as React from 'react';

type IconProps = React.SVGProps<SVGSVGElement>;

export function IconVoiceBars(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 11v2" />
      <path d="M8 9v6" />
      <path d="M12 6v12" />
      <path d="M16 9v6" />
      <path d="M20 11v2" />
    </svg>
  );
}
