import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { propertyStateSchema } from "../config/stepValidationSchemas";
import { FormContainer, Button, Dropdown } from "../components";
import { useFormStore } from "../store/formStore";

export default function PropertyState() {
  const setParam = useFormStore((state) => state.updateField);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    watch,
  } = useForm({
    resolver: yupResolver(propertyStateSchema),
    mode: "onTouched",
    defaultValues: { propertyState: "" },
  });
  const navigate = useNavigate();

  const propertyState = watch("propertyState");

  const onSubmit = (data) => {
    setParam("propertyState", data.propertyState);
    navigate("/loan-officer");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <div className="flex flex-col items-center w-full">
        <FormContainer>
          <h2 className="mb-4 text-lg font-semibold text-center">
            Select your property state
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 w-full items-center justify-center mb-4">
            <h3 className="font-normal m-0 max-w-[300px] text-base text-center sm:text-left">
              In what state is the property you're looking to purchase?
            </h3>
            <div className="flex flex-col">
              <Dropdown
                label="State"
                value={propertyState}
                onChange={(e) => {}}
                options={[
                  { value: "CA", label: "CA" },
                  { value: "TX", label: "TX" },
                  { value: "CO", label: "CO" },
                ]}
                {...register("propertyState")}
              />
              {errors.propertyState && (
                <div className="text-red-600 text-xs mt-1">
                  {errors.propertyState.message}
                </div>
              )}
            </div>
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
              type="submit"
              disabled={!isDirty || !isValid}
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
