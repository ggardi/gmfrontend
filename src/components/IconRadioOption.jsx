import React from "react";
import PropTypes from "prop-types";

const IconRadioOption = ({
  value,
  label,
  icon,
  imgMb = 1,
  checked,
  onChange,
  name,
  ...rest
}) => {
  const containerClasses = [
    "flex flex-col items-center justify-between",
    "border border-gray-300",
    "rounded-lg",
    "p-4 m-2",
    "w-40 min-h-[140px]",
    "transition-colors duration-150",
    checked ? "border-[var(--color-primary)] bg-gray-50" : "bg-white",
    "cursor-pointer",
    "hover:shadow-md focus-within:shadow-md",
  ].join(" ");

  const iconClasses = [`mb-${imgMb}`, "w-10 h-10", "object-contain"].join(" ");

  const labelClasses = [
    "block text-xs font-medium text-gray-700 mt-2 text-center",
  ].join(" ");

  return (
    <label className={containerClasses}>
      {/* Icon at the top */}
      {typeof icon === "string" ? (
        <img src={icon} alt="" className={iconClasses} />
      ) : (
        <span className={iconClasses}>{icon}</span>
      )}
      {/* Label below icon, above radio */}
      <span className={labelClasses}>{label}</span>
      {/* Custom radio indicator below label */}
      <div className="flex flex-col items-center mt-2 mb-2">
        <input
          type="radio"
          value={value}
          checked={checked}
          onChange={onChange}
          name={name}
          className="peer appearance-none w-5 h-5 border border-gray-400 rounded-full checked:border-[var(--color-primary)] checked:bg-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-colors duration-150 mb-1"
          {...rest}
        />
        {/* Custom dot for checked state */}
        <span className="-mt-6 pointer-events-none absolute">
          {checked && (
            <span className="block w-3 h-3 bg-white border-2 border-[var(--color-primary)] rounded-full mx-auto mt-1"></span>
          )}
        </span>
      </div>
    </label>
  );
};

IconRadioOption.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  imgMb: PropTypes.number,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  name: PropTypes.string,
};

export default IconRadioOption;
