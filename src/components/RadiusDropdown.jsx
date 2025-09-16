import React from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Input,
} from "@mui/material";

function RadiusDropdown({
  value,
  onChange,
  label = "Distance",
  selectProps = {},
  ...props
}) {
  const numbers = [5, 10, 15, 20, 25, 50, 75, 100];
  return (
    <FormControl
      variant="filled"
      sx={{
        maxWidth: 60,
        "& .MuiFilledInput-root": {
          border: "1px solid #ccc",
          borderRadius: 1,
          backgroundColor: "#fff",
          transition: "border-color 0.2s",
          height: 51,
          paddingLeft: 12,
          paddingRight: 12,
        },
      }}
    >
      <Select value={value} onChange={onChange} displayEmpty {...selectProps}>
        <InputLabel id="demo-simple-select-filled-label">Distance</InputLabel>
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
    </FormControl>
  );
}

export default RadiusDropdown;
