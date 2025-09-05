import React from "react";
import { render, screen } from "@testing-library/react";
import FormInput from "../FormInput";

describe("FormInput", () => {
  it("renders with label", () => {
    render(<FormInput label="First Name" />);
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
  });

  it("shows error message when error prop is set", () => {
    render(<FormInput label="Email" error="Required" />);
    expect(screen.getByText(/required/i)).toBeInTheDocument();
  });
});
