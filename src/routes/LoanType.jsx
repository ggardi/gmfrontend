import React from "react";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { aboutYouSchema } from "../config/validationSchemas";
import { FormContainer, Button } from "../components";

export default function LoanType() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({
    resolver: yupResolver(aboutYouSchema),
    mode: "onTouched",
  });
  const navigate = useNavigate();

  const onSubmit = (data) => {
    // handle form data, e.g., save to store or proceed
    navigate("/property-state");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <FormContainer>
          <h2>Loan TypeSelect a loan type</h2>
          {/* ...add your loan type fields here... */}
        </FormContainer>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={4}
          width="100%"
        >
          <Button
            type="button"
            onClick={() => navigate(-1)}
            sx={{ minWidth: 110, ml: { xs: 0, sm: 7 } }}
          >
            {"< Back"}
          </Button>
          <Box flexGrow={1} display="flex" justifyContent="center">
            <Button
              variant="contained"
              type="submit"
              disabled={!isDirty || !isValid}
              sx={{ minWidth: 110 }}
            >
              Next
            </Button>
          </Box>
          <Box width="75px" /> {/* Adjust width as needed */}
        </Box>
      </Box>
    </form>
  );
}
