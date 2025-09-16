import React from "react";

const Button = ({
  children,
  disabled = false,
  className = "",
  width,
  height,
  fullWidth = false,
  style = {},
  ...props
}) => {
  const baseClasses = [
    "inline-flex items-center justify-center",
    "text-base font-semibold leading-tight",
    "transition-all duration-150",
    fullWidth ? "w-full" : "",
    disabled
      ? "bg-[var(--color-button-disabled)] text-[#00000099] cursor-not-allowed"
      : "bg-[var(--color-primary)] text-white hover:opacity-80 cursor-pointer",
    className,
  ].join(" ");

  const buttonStyle = {
    width: width || (fullWidth ? "100%" : 121),
    height: height || 48,
    borderRadius: 0,
    ...style,
  };

  return (
    <button
      className={baseClasses}
      disabled={disabled}
      style={buttonStyle}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
