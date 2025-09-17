import React, { useState } from "react";
import { FormContainer, Button } from "../components";
import CreatePassword from "./CreatePassword";
import { useFormStore } from "../store/formStore";

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
          <div className="flex flex-col gap-4 w-full max-w-md mx-auto items-center justify-center mb-4">
            <div className="w-full bg-gray-50 rounded-lg p-4 shadow flex flex-col gap-2">
              <div className="text-gray-700">
                Name: {formData.firstName} {formData.lastName}
              </div>
              <div className="text-gray-700">Email: {formData.email}</div>
              <div className="text-gray-700">
                {formData.loanOfficer ? (
                  <>Loan Officer: {formData.loanOfficer}</>
                ) : formData.branchId ? (
                  <>Branch: {formData.branchId}</>
                ) : null}
              </div>
              {/* TODO-BFF: Fetch and display real user/loan officer/branch info from backend */}
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
