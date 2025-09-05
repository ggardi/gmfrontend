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
          ></Box>
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
