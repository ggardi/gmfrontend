import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "../Header";

describe("Header", () => {
  it("renders the Guild Mortgage Logo", () => {
    render(<Header />);
    const logo = screen.getByAltText(/guild mortgage logo/i);
    expect(logo).toBeInTheDocument();
  });
});
