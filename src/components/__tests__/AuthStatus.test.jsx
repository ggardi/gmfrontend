import { render, screen } from "@testing-library/react";
import AuthStatus from "../AuthStatus";
import "@testing-library/jest-dom";

jest.mock("@azure/msal-react", () => ({
  useMsal: () => ({
    accounts: [
      {
        name: "Test User",
        username: "testuser@example.com",
      },
    ],
  }),
}));

test("renders AuthStatus with user info and next button", () => {
  const handleNext = jest.fn();
  render(<AuthStatus onNext={handleNext} />);
  expect(
    screen.getByText(/here's the name and email we have on file/i)
  ).toBeInTheDocument();
  expect(screen.getByText(/Test User/)).toBeInTheDocument();
  expect(screen.getByText(/testuser@example.com/)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /next/i })).toBeInTheDocument();
});
