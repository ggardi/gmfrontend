import React from "react";
import { useFormStore } from "../store/formStore";
import Box from "@mui/material/Box";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loanTypeSchema } from "../config/stepValidationSchemas";
import { FormContainer, Button, IconRadioOption } from "../components";
import PurchaseIcon from "../assets/PurchaseIcon.svg";
import RefinanceIcon from "../assets/RefinanceIcon.svg";

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
              onChange={(e) =>
                setValue("loanType", e.target.value, { shouldDirty: true })
              }
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
                  onChange={(e) =>
                    setValue("loanType", e.target.value, { shouldDirty: true })
                  }
                  name="loanType"
                  sx={{ mx: 2 }}
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
