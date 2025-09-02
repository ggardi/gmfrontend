import React, { useRef, useEffect } from "react";
import TextField from "@mui/material/TextField";

const FormInput = ({ label, error, className = "", ...props }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;
    const handleFocus = () => {
      input.style.border = `1px solid ${
        props?.theme?.palette?.primary?.main || "#1976d2"
      }`;
    };
    const handleBlur = () => {
      input.style.border = "1px solid #ccc";
    };
    input.addEventListener("focus", handleFocus);
    input.addEventListener("blur", handleBlur);
    return () => {
      input.removeEventListener("focus", handleFocus);
      input.removeEventListener("blur", handleBlur);
    };
  }, [props?.theme?.palette?.primary?.main]);

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
            padding: "0 16px",
            height: 51,
            backgroundColor: "#fff",
          },
          className,
          ref: inputRef,
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
          borderRadius: 2,
          backgroundColor: "#fff",
          transition: "border-color 0.2s",
          height: 51,
        },
        "& .MuiFilledInput-root.Mui-focused": {
          border: `1px solid ${
            props?.theme?.palette?.primary?.main || "#1976d2"
          }`,
        },
      }}
      {...props}
    />
  );
};

export default FormInput;
