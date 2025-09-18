import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "../Header";

const mockDomainConfig = {
  headerLogoLink: "https://example.com/logo.png",
};

describe("Header", () => {
  it("renders the Guild Mortgage Logo", () => {
    render(<Header domainConfig={mockDomainConfig} />);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });
});
