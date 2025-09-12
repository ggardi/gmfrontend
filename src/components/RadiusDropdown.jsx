import React from "react";
import { Select, MenuItem } from "@mui/material";

/**
 * Reusable dropdown for selecting a number in a range.
 * @param {number} min - Minimum value (inclusive)
 * @param {number} max - Maximum value (inclusive)
 * @param {number} value - Currently selected value
 * @param {function} onChange - Handler for value change
 * @param {string} [label] - Optional label for the dropdown
 * @param {object} [selectProps] - Additional props for the Select component
 */
function RadiusDropdown({
  min = 5,
  max = 100,
  value,
  onChange,
  label = "Distance",
  selectProps = {},
}) {
  const numbers = [5, 10, 15, 20, 25, 50, 75, 100];
  return (
    <Select value={value} onChange={onChange} displayEmpty {...selectProps}>
      {label && (
        <MenuItem value="" disabled>
          {label}
        </MenuItem>
      )}
      {numbers.map((num) => (
        <MenuItem key={num} value={num}>
          {num}
        </MenuItem>
      ))}
    </Select>
  );
}

export default RadiusDropdown;
