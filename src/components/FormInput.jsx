import React, { useId, useState } from "react";

const FormInput = ({
  label,
  error,
  className = "",
  value: valueProp,
  onChange,
  ...props
}) => {
  const id = useId();
  const [isFocused, setIsFocused] = useState(false);
  const [internalValue, setInternalValue] = useState("");
  const isControlled = valueProp !== undefined;
  const value = isControlled ? valueProp : internalValue;
  const hasValue = value && value.length > 0;

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const handleChange = (e) => {
    if (!isControlled) setInternalValue(e.target.value);
    if (onChange) onChange(e);
  };

  const inputBaseClasses = [
    "w-full",
    "px-3 pt-5 pb-2",
    "border",
    "shadow-sm",
    "transition-all duration-200",
    "focus:outline-none focus:ring-2 focus:border-blue-500",
    "rounded-lg",
    error
      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500",
    className,
  ].join(" ");

  const labelBaseClasses = [
    "absolute left-3",
    isFocused || hasValue
      ? "-top-2 text-xs text-blue-600 bg-white px-1"
      : "top-2 text-sm text-gray-500",
    "pointer-events-none",
    "transition-all duration-200",
    "bg-white",
    "rounded",
    "origin-left",
    "z-10",
  ].join(" ");

  const errorClasses = "mt-1 text-sm text-red-500";

  return (
    <div className="mb-4 relative">
      <input
        id={id}
        className={inputBaseClasses}
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        {...props}
      />
      <label htmlFor={id} className={labelBaseClasses}>
        {label}
      </label>
      {error && <div className={errorClasses}>{error}</div>}
    </div>
  );
};

export default FormInput;
