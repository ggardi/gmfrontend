import React from "react";
import { useFormStore } from "../store/formStore";

export default function DebugFormState() {
  const formData = useFormStore((state) => state.formData);

  const containerClasses = [
    "fixed bottom-4 right-4",
    "bg-white text-[#222]",
    "border border-[#ccc]",
    "rounded",
    "p-2",
    "shadow-lg",
    "z-[2000]",
    "text-xs",
    "max-w-xs max-h-[300px]",
    "overflow-auto",
    "opacity-95",
  ].join(" ");

  return (
    <div className={containerClasses}>
      <strong>Form State (Debug):</strong>
      <pre className="m-0 text-[11px]">{JSON.stringify(formData, null, 2)}</pre>
    </div>
  );
}
