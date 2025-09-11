import Pagination from "@mui/material/Pagination";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { useNavigate, useParams } from "react-router-dom";
import { FormContainer, Button, FormInput } from "../components";
import { useFormStore } from "../store/formStore";

import SearchIcon from "../components/SearchIcon";
import CloseIcon from "../components/CloseIcon";

// Validation: require either officerId or branchId
const loanOfficerStepSchema = yup
  .object()
  .shape({
    officerId: yup.string(),
    branchId: yup.string(),
  })
  .test(
    "one-required",
    "Please select a loan officer or a branch.",
    (obj) => !!(obj.officerId || obj.branchId)
  );

export default function LoanOfficer() {
  // Local state for search fields
  const [officerName, setOfficerName] = useState("");
  const [branchLocation, setBranchLocation] = useState("");
  const [officerResults, setOfficerResults] = useState([]);
  const [officerTotal, setOfficerTotal] = useState(0);
  const [officerPage, setOfficerPage] = useState(1);
  const [branchResults, setBranchResults] = useState([]);
  const [branchTotal, setBranchTotal] = useState(0);
  const [branchPage, setBranchPage] = useState(1);
  const pageSize = 5;
  const [lastSearchType, setLastSearchType] = useState(null); // 'officer' or 'branch'
  const updateField = useFormStore((state) => state.updateField);
  const {
    handleSubmit,
    setValue,
    formState: { errors, isValid, isDirty },
    watch,
  } = useForm({
    resolver: yupResolver(loanOfficerStepSchema),
    mode: "onTouched",
    defaultValues: { officerId: "", branchId: "" },
  });
  const selectedOfficerId = watch("officerId");
  const selectedBranchId = watch("branchId");

  // Mock API search for officer
  useEffect(() => {
    if (officerName.length >= 3) {
      const timeout = setTimeout(() => {
        // Simulate a large dataset
        const allResults = Array.from({ length: 23 }, (_, i) => ({
          id: `officer${i + 1}`,
          name: `${officerName} Officer ${i + 1}`,
        }));
        setOfficerTotal(allResults.length);
        const start = (officerPage - 1) * pageSize;
        setOfficerResults(allResults.slice(start, start + pageSize));
      }, 400);
      return () => clearTimeout(timeout);
    } else {
      setOfficerResults([]);
      setOfficerTotal(0);
    }
  }, [officerName, officerPage]);

  // Reset page to 1 when search changes
  useEffect(() => {
    setOfficerPage(1);
  }, [officerName]);

  // Mock API search for branch
  useEffect(() => {
    if (branchLocation.length >= 3) {
      const timeout = setTimeout(() => {
        // Simulate a large dataset
        const allResults = Array.from({ length: 17 }, (_, i) => ({
          id: `branch${i + 1}`,
          name: `${branchLocation} Branch ${i + 1}`,
        }));
        setBranchTotal(allResults.length);
        const start = (branchPage - 1) * pageSize;
        setBranchResults(allResults.slice(start, start + pageSize));
      }, 400);
      return () => clearTimeout(timeout);
    } else {
      setBranchResults([]);
      setBranchTotal(0);
    }
  }, [branchLocation, branchPage]);

  // Reset page to 1 when search changes
  useEffect(() => {
    setBranchPage(1);
  }, [branchLocation]);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    // Only allow submit if one is selected (enforced by schema)
    updateField("officerId", data.officerId || "");
    updateField("branchId", data.branchId || "");
    navigate("/loan-type");
  };

  function SearchResults({ results, selectedId, onSelect, type }) {
    return (
      <Box
        sx={{
          width: "100%",
          maxWidth: 312,
          bgcolor: "#f9f9f9",
          border: "1px solid #eee",
          borderRadius: 1,
          mt: 1,
          mb: 2,
          p: 1,
        }}
      >
        {results.map((item) => (
          <Box
            key={item.id}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              py: 0.5,
              px: 1,
              cursor: "pointer",
              bgcolor: selectedId === item.id ? "#e0f7fa" : undefined,
              "&:hover": { bgcolor: "#ececec" },
            }}
            onClick={() => onSelect(item.id, item.name)}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {item.name}{" "}
              <span style={{ color: "#aaa", fontSize: 12, marginLeft: 6 }}>
                ({item.id})
              </span>
            </Box>
            <Radio
              checked={selectedId === item.id}
              value={item.id}
              tabIndex={-1}
              onChange={() => onSelect(item.id, item.name)}
              sx={{ ml: 2 }}
            />
          </Box>
        ))}
      </Box>
    );
  }

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
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 2,
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {[
              {
                key: "officer",
                label: "Search for a loan officer",
                placeholder: "Search by name",
                value: officerName,
                setValueFn: setOfficerName,
                setResults: setOfficerResults,
                clearFormState: () => {
                  setValue("officerId", "", {
                    shouldDirty: true,
                    shouldValidate: true,
                  });
                  updateField("officerId", "");
                },
                otherValue: branchLocation,
                setLast: () => setLastSearchType("officer"),
                clearLast: () => setLastSearchType(null),
                iconTest: !!officerName,
              },
              {
                key: "branch",
                label: "Search for a branch",
                placeholder: "Search by location",
                value: branchLocation,
                setValueFn: setBranchLocation,
                setResults: setBranchResults,
                clearFormState: () => {
                  setValue("branchId", "", {
                    shouldDirty: true,
                    shouldValidate: true,
                  });
                  updateField("branchId", "");
                },
                otherValue: officerName,
                setLast: () => setLastSearchType("branch"),
                clearLast: () => setLastSearchType(null),
                iconTest: !!branchLocation,
              },
            ].map((field) => (
              <Box key={field.key} sx={{ flex: 1, minWidth: 200 }}>
                <FormInput
                  label={field.label}
                  type="text"
                  placeholder={field.placeholder}
                  value={field.value}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.setValueFn(value);
                    if (value) {
                      field.setLast();
                    } else if (!field.otherValue) {
                      field.clearLast();
                    }
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      {field.iconTest ? (
                        <IconButton
                          edge="end"
                          tabIndex={-1}
                          onClick={() => {
                            field.setValueFn("");
                            field.setResults([]);
                            field.clearFormState();
                            if (!field.otherValue) field.clearLast();
                          }}
                        >
                          <CloseIcon />
                        </IconButton>
                      ) : (
                        <IconButton edge="end" tabIndex={-1} disabled>
                          <SearchIcon />
                        </IconButton>
                      )}
                    </InputAdornment>
                  }
                />
              </Box>
            ))}

            {lastSearchType === "officer" && officerResults.length > 0 && (
              <Box display={"flex"} flexDirection="column" width="100%">
                <SearchResults
                  results={officerResults}
                  selectedId={selectedOfficerId}
                  onSelect={(id, name) => {
                    setValue("officerId", id, {
                      shouldDirty: true,
                      shouldValidate: true,
                    });
                    setValue("branchId", "", {
                      shouldDirty: true,
                      shouldValidate: true,
                    });
                    updateField("officerId", id);
                    updateField("branchId", "");
                  }}
                  type="officer"
                />
                <Pagination
                  count={Math.ceil(officerTotal / pageSize)}
                  page={officerPage}
                  onChange={(_, value) => setOfficerPage(value)}
                  sx={{ mt: 2, display: "flex", justifyContent: "center" }}
                  size="small"
                  color="primary"
                  showFirstButton
                  showLastButton
                  disabled={officerTotal <= pageSize}
                />
              </Box>
            )}
            {lastSearchType === "branch" && branchResults.length > 0 && (
              <Box display={"flex"} flexDirection="column" width="100%" mt={2}>
                <SearchResults
                  results={branchResults}
                  selectedId={selectedBranchId}
                  onSelect={(id, name) => {
                    setValue("branchId", id, {
                      shouldDirty: true,
                      shouldValidate: true,
                    });
                    setValue("officerId", "", {
                      shouldDirty: true,
                      shouldValidate: true,
                    });
                    updateField("branchId", id);
                    updateField("officerId", "");
                  }}
                  type="branch"
                />
                <Pagination
                  count={Math.ceil(branchTotal / pageSize)}
                  page={branchPage}
                  onChange={(_, value) => setBranchPage(value)}
                  sx={{ mt: 2, display: "flex", justifyContent: "center" }}
                  size="small"
                  color="primary"
                  showFirstButton
                  showLastButton
                  disabled={branchTotal <= pageSize}
                />
              </Box>
            )}
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
          {errors && errors["one-required"] && (
            <Box sx={{ color: "red", mt: 1, fontSize: 14 }}>
              {errors["one-required"].message}
            </Box>
          )}
        </Box>
      </Box>
    </form>
  );
}
