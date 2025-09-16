import React from "react";

const CloseIcon = ({ className = "", ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={[
      // Default size and color, can be overridden via className
      "w-6 h-6 text-gray-500 hover:text-gray-700 transition-colors duration-150",
      className,
    ].join(" ")}
    aria-hidden="true"
    {...props}
  >
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);

export default CloseIcon;
