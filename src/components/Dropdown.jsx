import React from "react";

function Dropdown({
  label = "Select",
  value,
  onChange,
  options = [],
  ...props
}) {
  return (
    <div className="w-auto max-w-[120px]">
      <select
        id="dropdown-select"
        value={value}
        onChange={onChange}
        className="block w-full rounded-lg border-2 border-gray-300 bg-white px-3 h-[44px] text-sm shadow-sm focus:outline-none focus:ring-2 focus:border-blue-600 focus:ring-blue-200"
        {...props}
      >
        <option value="" disabled>
          {label}
        </option>
        {options.map((opt) => (
          <option
            key={typeof opt === "object" ? opt.value : opt}
            value={typeof opt === "object" ? opt.value : opt}
          >
            {typeof opt === "object" ? opt.label : opt}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;
