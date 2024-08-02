import React from 'react';

const ProfileIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6"
    width="50"
    height="50"
    {...props}
  >
    <path
      d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-3.87 0-7 3.13-7 7v1h14v-1c0-3.87-3.13-7-7-7z"
    />
  </svg>
);

export default ProfileIcon;
