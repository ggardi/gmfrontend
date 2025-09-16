import React from "react";
import { useFormStore } from "../store/formStore";
// Removed Material UI imports
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loanTypeSchema } from "../config/stepValidationSchemas";
import { FormContainer, Button, IconRadioOption } from "../components";
import PurchaseIcon from "../assets/purchaseIcon.svg";
import RefinanceIcon from "../assets/refinanceIcon.svg";

export default function LoanType() {
  const setParam = useFormStore((state) => state.updateField);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid, isDirty },
  } = useForm({
    resolver: yupResolver(loanTypeSchema),
    mode: "onTouched",
    defaultValues: { loanType: "" },
  });
  const navigate = useNavigate();

  const selectedLoanType = watch("loanType");

  const onSubmit = (data) => {
    setParam("loanType", data.loanType);
    navigate("/property-state");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <div className="flex flex-col items-center w-full">
        <FormContainer>
          <h2 className="mb-4 text-lg font-semibold text-center">
            Select a loan type
          </h2>
          <div className="flex flex-row justify-center gap-4 mb-4">
            {[
              {
                value: "purchase",
                label: "Purchase",
                icon: PurchaseIcon,
                imgMb: 1,
              },
              {
                value: "refinance",
                label: "Refinance",
                icon: RefinanceIcon,
                imgMb: 2,
              },
            ].map((option) => (
              <IconRadioOption
                key={option.value}
                value={option.value}
                label={option.label}
                icon={option.icon}
                imgMb={option.imgMb}
                checked={selectedLoanType === option.value}
                onChange={(e) =>
                  setValue("loanType", e.target.value, { shouldDirty: true })
                }
                name="loanType"
              />
            ))}
          </div>
        </FormContainer>
        <div className="flex justify-between items-center mt-4 w-full max-w-lg">
          <Button
            type="button"
            onClick={() => navigate(-1)}
            className="min-w-[110px] ml-0 sm:ml-7"
          >
            {"< Back"}
          </Button>
          <div className="flex-grow flex justify-center">
            <Button
              variant="contained"
              type="submit"
              disabled={!selectedLoanType}
              className="min-w-[110px]"
            >
              Next
            </Button>
          </div>
          <div style={{ width: 75 }} /> {/* Adjust width as needed */}
        </div>
      </div>
    </form>
  );
}
