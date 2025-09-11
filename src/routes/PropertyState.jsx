import React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { propertyStateSchema } from "../config/stepValidationSchemas";
import { FormContainer, Button } from "../components";
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
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <FormContainer>
          <h2>Select your property state</h2>
          {/* //In what state is the property you're looking to purchase? */}
          <Box
            sx={{
              gap: 2,
              display: "flex",
              flexDirection: { xs: "column", sm: "row", m: "row" },
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              component="h3"
              sx={{
                fontWeight: "normal",
                m: 0,
                maxWidth: 300,
              }}
            >
              In what state is the property you're looking to purchase?
            </Box>
            <FormControl
              sx={{ m: 1, minWidth: 120 }}
              error={!!errors.propertyState}
            >
              <Select
                value={propertyState}
                onChange={() => {}}
                displayEmpty
                {...register("propertyState")}
              >
                <MenuItem value=""> State </MenuItem>
                <MenuItem value={"CA"}>CA</MenuItem>
                <MenuItem value={"TX"}>TX</MenuItem>
                <MenuItem value={"CO"}>CO</MenuItem>
              </Select>
              {errors.propertyState && (
                <Box sx={{ color: "error.main", fontSize: 13, mt: 1 }}>
                  {errors.propertyState.message}
                </Box>
              )}
            </FormControl>
          </Box>
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
            sx={{ ml: { xs: 0, sm: 7 } }}
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
