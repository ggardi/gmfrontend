import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { aboutYouSchema } from "../config/validationSchemas";
import { FormContainer, Button, FormInput, AuthStatus } from "../components";

export default function AboutYou() {
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
    // handle form data, e.g., save to store or proceed
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
            <FormInput
              label="First Name"
              type="text"
              placeholder="First name"
              {...register("firstName")}
              error={errors.firstName?.message}
            />
            <FormInput
              label="Last Name"
              type="text"
              placeholder="Last name"
              {...register("lastName")}
              error={errors.lastName?.message}
            />
            <FormInput
              label="Email"
              type="email"
              placeholder="Email"
              {...register("email")}
              error={errors.email?.message}
            />
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
