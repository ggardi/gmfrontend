import { useFormStore } from "../store/formStore";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { useMsal } from "@azure/msal-react";
import { useTheme } from "@mui/material/styles";

import { FormContainer, Button, FormInput } from "../components";

export default function AboutYou() {
  const navigate = useNavigate();
  const { formData, updateField } = useFormStore();
  const theme = useTheme();
  const { accounts } = useMsal();
  const isLoggedIn = accounts && accounts.length > 0;

  if (isLoggedIn) {
    return <AuthStatus onNext={() => navigate("/loan-type")} />;
  }

  return (
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
            value={formData.firstName}
            minLength={2}
            maxLength={20}
            required
            error={
              formData.firstName.length > 0 &&
              (formData.firstName.length < 2 || formData.firstName.length > 20)
                ? "First name must be 2-20 characters"
                : ""
            }
            onChange={(e) => {
              const value = e.target.value.replace(/[^a-zA-Z'-]/g, "");
              updateField("firstName", value);
            }}
          />
          <FormInput
            label="Last Name"
            type="text"
            placeholder="Last name"
            value={formData.lastName}
            minLength={2}
            maxLength={24}
            required
            error={
              formData.lastName.length > 0 &&
              (formData.lastName.length < 2 || formData.lastName.length > 24)
                ? "Last name must be 2-24 characters"
                : ""
            }
            onChange={(e) => {
              const value = e.target.value.replace(/[^a-zA-Z'-]/g, "");
              updateField("lastName", value);
            }}
          />
          <FormInput
            label="Email"
            type="email"
            placeholder="Email"
            value={formData.email}
            maxLength={40}
            required
            error={
              formData.email.length > 0 &&
              !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)
                ? "Enter a valid email address"
                : ""
            }
            onChange={(e) => updateField("email", e.target.value)}
          />
        </Box>
      </FormContainer>
      <Box
        sx={{ display: "flex", justifyContent: "center", width: "100%", mt: 4 }}
      >
        <Button variant="contained" onClick={() => navigate("/loan-type")}>
          Next
        </Button>
      </Box>
    </Box>
  );
}
