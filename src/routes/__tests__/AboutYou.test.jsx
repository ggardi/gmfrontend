import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AboutYou from "../AboutYou";
import { validationMessages } from "../../config/validationMessages";

jest.mock("@azure/msal-react", () => ({
  useMsal: () => ({ accounts: [] }),
}));

jest.mock("../../components", () => ({
  ...jest.requireActual("../../components"),
  AuthStatus: () => <div>AuthStatus Component</div>,
}));

// Mock FormContainer and FormInput for isolation if needed
// jest.mock("../components/FormContainer", () => ({ children }) => <div>{children}</div>);
// jest.mock("../components/FormInput", () => (props) => <input {...props} />);

describe("AboutYou Route", () => {
  it("renders the About You form", () => {
    render(
      <MemoryRouter>
        <AboutYou />
      </MemoryRouter>
    );
    expect(screen.getByText(/about you/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
  });

  it("shows validation errors on blur with empty fields", async () => {
    render(
      <MemoryRouter>
        <AboutYou />
      </MemoryRouter>
    );
    // Blur each field to trigger validation
    fireEvent.blur(screen.getByLabelText(/first name/i));
    fireEvent.blur(screen.getByLabelText(/last name/i));
    fireEvent.blur(screen.getByLabelText(/email/i));
    // Use flexible matcher in case of extra markup
    expect(
      await screen.findByText((content) =>
        content.includes(validationMessages.firstNameRequired)
      )
    ).toBeInTheDocument();
    expect(
      await screen.findByText((content) =>
        content.includes(validationMessages.lastNameRequired)
      )
    ).toBeInTheDocument();
    expect(
      await screen.findByText((content) =>
        content.includes(validationMessages.emailRequired)
      )
    ).toBeInTheDocument();
  });
});
