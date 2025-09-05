import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import GuildButton from "../Button";

describe("GuildButton", () => {
  it("renders with the correct text", () => {
    render(<GuildButton>Click Me</GuildButton>);
    expect(
      screen.getByRole("button", { name: /click me/i })
    ).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<GuildButton onClick={handleClick}>Click Me</GuildButton>);
    fireEvent.click(screen.getByRole("button", { name: /click me/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when the disabled prop is true", () => {
    render(<GuildButton disabled>Disabled</GuildButton>);
    expect(screen.getByRole("button", { name: /disabled/i })).toBeDisabled();
  });
});
