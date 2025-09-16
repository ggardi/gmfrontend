import React from "react";

// FormContainer with grouped Tailwind classes for readability
const FormContainer = ({ children, className = "", ...props }) => {
  const containerClasses = [
    // Layout & size
    "bg-gray-50 border-b-16 max-w-[686px] w-full min-h-[404px]",
    // Flexbox
    "flex flex-col items-center",
    // Padding (responsive)
    "px-2 sm:px-4 md:px-8 py-4 sm:py-6 md:py-8",
    className,
  ].join(" ");

  return (
    <div
      className={containerClasses}
      style={{ borderColor: "var(--color-primary)" }}
      {...props}
    >
      {children}
    </div>
  );
};

export default FormContainer;
