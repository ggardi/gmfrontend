import React, { useState } from "react";
import Box from "@mui/material/Box";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { aboutYouSchema } from "../config/validationSchemas";
import { FormContainer, Button, IconRadioOption } from "../components";
import PurchaseIcon from "../assets/PurchaseIcon.svg";
import RefinanceIcon from "../assets/RefinanceIcon.svg";

export default function LoanType() {
  const [selectedLoanType, setSelectedLoanType] = useState("");
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
          <h2>Select a loan type</h2>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="select-loan-type"
              name="loanType"
              value={selectedLoanType}
              onChange={(e) => setSelectedLoanType(e.target.value)}
            >
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
                  onChange={(e) => setSelectedLoanType(e.target.value)}
                  name="loanType"
                  sx={{ mx: 2 }}
                  disableRipple
                />
              ))}
            </RadioGroup>
          </FormControl>
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
              disabled={!selectedLoanType}
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
