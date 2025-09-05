import React from "react";
import { render, screen } from "@testing-library/react";
import FormContainer from "../FormContainer";

describe("FormContainer", () => {
  it("renders children", () => {
    render(
      <FormContainer>
        <div>Test Child</div>
      </FormContainer>
    );
    expect(screen.getByText(/test child/i)).toBeInTheDocument();
  });
});
