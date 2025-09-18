import React from "react";
import Box from "@mui/material/Box";
import { useNavigate, useParams } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { aboutYouSchema } from "../config/stepValidationSchemas";
import { FormContainer, Button, FormInput, AuthStatus } from "../components";
import { useFormStore } from "../store/formStore";

export default function AboutYou() {
  const { officerId, branchId } = useParams();
  const setParam = useFormStore((state) => state.updateField);
  React.useEffect(() => {
    if (officerId) setParam("officerId", officerId);
    if (branchId) setParam("branchId", branchId);
  }, [officerId, branchId, setParam]);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({
    resolver: yupResolver(aboutYouSchema),
    mode: "onTouched",
  });
  const navigate = useNavigate();
  const { accounts } = useMsal();
  const isLoggedIn = accounts && accounts.length > 0;

  const onSubmit = (data) => {
    // Sync form fields to global store
    setParam("firstName", data.firstName);
    setParam("lastName", data.lastName);
    setParam("email", data.email);
    navigate("/loan-type");
  };

  if (isLoggedIn) {
    return <AuthStatus onNext={() => navigate("/loan-type")} />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <div className="flex flex-col items-center justify-center w-full">
        <FormContainer>
          <h2 className="mb-4 text-lg font-semibold text-center">About You</h2>
          <div className="flex flex-col gap-6 w-full items-center justify-center p-10">
            {[
              {
                name: "firstName",
                label: "First Name",
                type: "text",
                placeholder: "First name",
              },
              {
                name: "lastName",
                label: "Last Name",
                type: "text",
                placeholder: "Last name",
              },
              {
                name: "email",
                label: "Email",
                type: "email",
                placeholder: "Email",
              },
            ].map((field) => (
              <FormInput
                key={field.name}
                label={field.label}
                type={field.type}
                // placeholder={field.placeholder}
                {...register(field.name)}
                error={errors[field.name]?.message}
              />
            ))}
          </div>
        </FormContainer>
        <div className="flex justify-center w-full mt-4">
          <Button
            variant="contained"
            type="submit"
            disabled={!isDirty || !isValid}
          >
            Next
          </Button>
        </div>
      </div>
    </form>
  );
}
