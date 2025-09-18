import React, { useState } from "react";
import { FormContainer, Button } from "../components";
import CreatePassword from "./CreatePassword";
import { useFormStore } from "../store/formStore";

function SummaryRow({ label, href, value, invisibleLabel }) {
  return (
    <div className="flex items-center justify-between">
      <a
        href={href}
        className={
          (invisibleLabel ? "invisible " : "") +
          "text-blue-700 text-base font-normal hover:underline"
        }
      >
        {label}
      </a>
      <div className="text-gray-800 text-base font-normal">{value}</div>
    </div>
  );
}

function LoanOfficerDetails({ officer }) {
  if (!officer) return null;
  return (
    <div className="flex gap-4 items-start mt-2">
      {officer.headshot && (
        <img
          src={officer.headshot}
          alt={officer.name}
          className="w-16 h-16 rounded-full object-cover border border-gray-200"
        />
      )}
      <div className="flex flex-col">
        <div className="text-xl text-blue-900 font-bold">{officer.name}</div>
        <div className="text-xs text-blue-900 font-normal leading-tight">
          {officer.title}
          <br />
          {officer.branch && officer.branch.name}
        </div>
        <a
          href={`mailto:${officer.email}`}
          className="text-sm font-semibold text-blue-900 mt-1"
        >
          {officer.email}
        </a>
        <div className="text-sm text-blue-900 font-normal mt-1">
          <span>Phone</span>:{" "}
          <a href={`tel:${officer.phone}`} className="underline">
            {officer.phone}
          </a>
          <br />
          {officer.phone && (
            <>
              <span>Mobile</span>:{" "}
              <a href={`tel:${officer.phone}`} className="underline">
                {officer.phone}
              </a>
              <br />
            </>
          )}
          {officer.branch && officer.branch.phone && (
            <>
              <span>Branch</span>:{" "}
              <a href={`tel:${officer.branch.phone}`} className="underline">
                {officer.branch.phone}
              </a>
              <br />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function BranchDetails({ branch }) {
  if (!branch) return null;
  return (
    <div className="flex flex-col">
      <div className="text-lg text-blue-900 font-bold">{branch.name}</div>
      <div className="text-xs text-blue-900 font-normal leading-tight">
        {branch.address && (
          <>
            {branch.address.street}
            <br />
            {branch.address.city}, {branch.address.state} {branch.address.zip}
          </>
        )}
      </div>
      <a
        href={`mailto:${branch.email}`}
        className="text-sm font-semibold text-blue-900 mt-1"
      >
        {branch.email}
      </a>
      <div className="text-sm text-blue-900 font-normal mt-1">
        {branch.phone && (
          <>
            <span>Phone</span>:{" "}
            <a href={`tel:${branch.phone}`} className="underline">
              {branch.phone}
            </a>
            <br />
          </>
        )}
      </div>
    </div>
  );
}

export default function ReviewSubmit({ runtimeConfig }) {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const formData = useFormStore((state) => state.formData);

  return (
    <>
      <div className="flex flex-col items-center w-full">
        <FormContainer>
          <h2 className="mb-4 text-lg font-semibold text-center">
            Review & Submit
          </h2>
          <div className="flex flex-col gap-4 w-full max-w-md mx-auto mb-4">
            <SummaryRow
              label="About You"
              href="/about-you"
              value={`${formData.firstName} ${formData.lastName}`}
            />
            <SummaryRow
              label="About You"
              href="/about-you"
              value={formData.email}
              invisibleLabel
            />
            <SummaryRow
              label="Loan type"
              href="/loan-type"
              value={formData.loanType}
            />
            <SummaryRow
              label="Property state"
              href="/property-state"
              value={formData.propertyState}
            />
            <div>
              <div className="flex items-center justify-between">
                <a
                  href="/loan-officer"
                  className="text-blue-700 text-base font-normal hover:underline mt-1"
                >
                  Loan officer
                </a>
                <div></div>
              </div>
              {formData.loanOfficer && formData.loanOfficer.id ? (
                <LoanOfficerDetails officer={formData.loanOfficer} />
              ) : formData.branch && formData.branch.id ? (
                <BranchDetails branch={formData.branch} />
              ) : null}
            </div>
          </div>
        </FormContainer>
        <div className="flex justify-center w-full mt-4">
          <Button
            className="min-w-[110px]"
            onClick={() => setShowPasswordModal(true)}
          >
            Continue
          </Button>
        </div>
      </div>
      {showPasswordModal && (
        <CreatePassword
          onClose={() => setShowPasswordModal(false)}
          runtimeConfig={runtimeConfig}
        />
      )}
    </>
  );
}
