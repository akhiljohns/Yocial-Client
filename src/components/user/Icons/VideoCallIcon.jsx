import React from 'react';

function VideoCallIcon({ size, color }) {
  return (
    <svg
      height={size?.height}
      width={size?.width}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke={color}
    >
      <path
        d="M23 7l-7 10H7l-7-10M17 7v7M12 17V7"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default VideoCallIcon;
