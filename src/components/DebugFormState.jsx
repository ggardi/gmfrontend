import React from "react";
import Box from "@mui/material/Box";
import { useFormStore } from "../store/formStore";

export default function DebugFormState() {
  const formData = useFormStore((state) => state.formData);
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 16,
        right: 16,
        bgcolor: "#fff",
        color: "#222",
        border: "1px solid #ccc",
        borderRadius: 2,
        p: 2,
        boxShadow: 3,
        zIndex: 2000,
        fontSize: 12,
        maxWidth: 320,
        maxHeight: 300,
        overflow: "auto",
        opacity: 0.95,
      }}
    >
      <strong>Form State (Debug):</strong>
      <pre style={{ margin: 0, fontSize: 11 }}>
        {JSON.stringify(formData, null, 2)}
      </pre>
    </Box>
  );
}
