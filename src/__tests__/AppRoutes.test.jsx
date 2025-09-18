import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { act } from "react";
import { useFormStore } from "../store/formStore";
import App from "../App";

jest.mock("@azure/msal-react", () => ({
  useMsal: () => ({ accounts: [] }),
}));

beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          apiBaseUrl: "http://localhost:3000",
          recaptchaSiteKey: "test-key",
        }),
    })
  );
});

afterAll(() => {
  global.fetch.mockRestore && global.fetch.mockRestore();
});

describe("App routing integration", () => {
  afterEach(() => {
    act(() => {
      useFormStore.getState().resetForm();
    });
  });

  const routeCases = [
    { path: "/", expected: /about you/i },
    { path: "/about-you", expected: /about you/i },
    { path: "/branches", expected: /about you/i },
    { path: "/branches/branch123/apply-online", expected: /about you/i },
    { path: "/officers", expected: /about you/i },
    { path: "/officers/officer123/apply-online", expected: /about you/i },
    { path: "/loan-type", expected: /loan type/i },
    { path: "/property-state", expected: /property state/i },
    { path: "/loan-officer", expected: /loan officer/i },
    { path: "/review-submit", expected: /review & submit/i },
    { path: "/some/unknown/path", expected: /about you/i },
  ];

  it.each(routeCases)(
    "renders correct heading for route: %s",
    async ({ path, expected }) => {
      render(
        <MemoryRouter initialEntries={[path]}>
          <App />
        </MemoryRouter>
      );
      await waitFor(() => {
        expect(
          screen.queryByText(/loading configuration/i)
        ).not.toBeInTheDocument();
      });
      if (path === "/loan-officer") {
        // Allow multiple headings for loan officer
        const headings = await screen.findAllByRole("heading", {
          name: expected,
        });
        expect(headings.length).toBeGreaterThan(0);
      } else {
        expect(
          await screen.findByRole("heading", { name: expected })
        ).toBeInTheDocument();
      }
    }
  );
});
