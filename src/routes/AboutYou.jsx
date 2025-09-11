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
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <FormContainer>
          <h2>About You</h2>
          {/* Debug message for branchId or officerId */}
          {branchId && (
            <Box sx={{ color: "orange", mb: 2, fontSize: 14 }}>
              Applying with branchId: <b>{branchId}</b>
            </Box>
          )}
          {officerId && (
            <Box sx={{ color: "orange", mb: 2, fontSize: 14 }}>
              Applying with officerId: <b>{officerId}</b>
            </Box>
          )}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
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
                placeholder={field.placeholder}
                {...register(field.name)}
                error={errors[field.name]?.message}
              />
            ))}
          </Box>
        </FormContainer>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            mt: 4,
          }}
        >
          <Button
            variant="contained"
            type="submit"
            disabled={!isDirty || !isValid}
          >
            Next
          </Button>
        </Box>
      </Box>
    </form>
  );
}
