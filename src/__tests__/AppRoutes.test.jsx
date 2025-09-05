import React from "react";
import { render, screen } from "@testing-library/react";
import { act } from "react";
import { useFormStore } from "../store/formStore";
import { MemoryRouter } from "react-router-dom";
import App from "../App";

const TEST_OFFICER_ID = "kenburns";
const TEST_BRANCH_ID = "irvine406";

// Mock all route components except AboutYou
jest.mock("../routes/LoanType", () => () => <div>LoanType Component</div>);
jest.mock("../routes/PropertyState", () => () => (
  <div>PropertyState Component</div>
));
jest.mock("../routes/LoanOfficer", () => () => (
  <div>LoanOfficer Component</div>
));
jest.mock("../routes/ReviewSubmit", () => () => (
  <div>ReviewSubmit Component</div>
));
jest.mock("../routes/CreatePassword", () => () => (
  <div>CreatePassword Component</div>
));

describe("App routing", () => {
  afterEach(() => {
    act(() => {
      useFormStore.getState().resetForm();
    });
  });

  const routeTestCases = [
    { path: "/", expected: /about you/i },
    { path: "/about-you", expected: /about you/i },
    { path: "/branches", expected: /about you/i },
    {
      path: `/branches/${TEST_BRANCH_ID}/apply-online`,
      expected: /about you/i,
    },
    {
      path: `/branches/${TEST_BRANCH_ID}/anything-else`,
      expected: /about you/i,
    },
    { path: "/officers", expected: /about you/i },
    { path: `/officers/${TEST_OFFICER_ID}`, expected: /about you/i },
    {
      path: `/officers/${TEST_OFFICER_ID}/apply-online`,
      expected: /about you/i,
    },
    { path: "/loan-type", expected: /loantype component/i },
    { path: "/property-state", expected: /propertystate component/i },
    { path: "/loan-officer", expected: /loanofficer component/i },
    { path: "/review-submit", expected: /reviewsubmit component/i },
    { path: "/create-password", expected: /createpassword component/i },
    { path: "/some/unknown/path", expected: /about you/i },
  ];

  it.each(routeTestCases)(
    "renders correct component for route: %s",
    ({ path, expected }) => {
      render(
        <MemoryRouter initialEntries={[path]}>
          <App />
        </MemoryRouter>
      );
      expect(screen.getByText(expected)).toBeInTheDocument();
    }
  );

  it("sets officerId in store for officer routes", async () => {
    render(
      <MemoryRouter
        initialEntries={[`/officers/${TEST_OFFICER_ID}/apply-online`]}
      >
        <App />
      </MemoryRouter>
    );
    // Wait for effect to run
    await act(async () => {});
    expect(useFormStore.getState().formData.officerId).toBe(TEST_OFFICER_ID);
    expect(useFormStore.getState().formData.branchId).toBe("");
  });

  it("sets branchId in store for branch routes", async () => {
    render(
      <MemoryRouter
        initialEntries={[`/branches/${TEST_BRANCH_ID}/apply-online`]}
      >
        <App />
      </MemoryRouter>
    );
    await act(async () => {});
    expect(useFormStore.getState().formData.branchId).toBe(TEST_BRANCH_ID);
    expect(useFormStore.getState().formData.officerId).toBe("");
  });

  it("does not set officerId or branchId for root/about-you routes", () => {
    render(
      <MemoryRouter initialEntries={["/about-you"]}>
        <App />
      </MemoryRouter>
    );
    expect(useFormStore.getState().formData.officerId).toBe("");
    expect(useFormStore.getState().formData.branchId).toBe("");
  });
});
