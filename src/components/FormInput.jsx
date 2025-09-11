import React, { useRef, useEffect } from "react";
import TextField from "@mui/material/TextField";

const FormInput = ({
  label,
  error,
  className = "",
  endAdornment,
  ...props
}) => {
  const inputRef = useRef(null);

  return (
    <TextField
      variant="filled"
      label={label}
      error={!!error}
      helperText={error}
      fullWidth
      required={props.required}
      slotProps={{
        input: {
          disableUnderline: true,
          style: {
            paddingLeft: 12, // match label's left position
            paddingRight: 12,
            height: 51,
            backgroundColor: "#fff",
          },
          className,
          ref: inputRef,
          ...(endAdornment ? { endAdornment } : {}),
        },
      }}
      sx={{
        width: "100%",
        maxWidth: 312,
        "@media (max-width: 400px)": {
          maxWidth: "100%",
        },
        "& .MuiFilledInput-root": {
          border: "1px solid #ccc",
          borderRadius: 1,
          backgroundColor: "#fff",
          transition: "border-color 0.2s",
          height: 51,
          paddingLeft: 12, // ensure input and label align
          paddingRight: 12,
        },
        "& .MuiFilledInput-root.Mui-focused": {
          border: `1px solid ${
            props?.theme?.palette?.primary?.main || "#1976d2"
          }`,
        },
        "& .MuiInputLabel-root": {
          left: 12, // align label with input text
          transition: "color 0.2s",
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: props?.theme?.palette?.primary?.main || "#1976d2",
        },
      }}
      {...props}
    />
  );
};

export default FormInput;
