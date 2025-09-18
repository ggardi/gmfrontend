import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import {
  FormContainer,
  Button,
  FormInput,
  Dropdown,
  SearchIcon,
  CloseIcon,
} from "../components";
import { useFormStore } from "../store/formStore";

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
  const radiusValue = useFormStore((state) => state.formData.radius);
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
        // Simulate a large dataset with all fields
        const allResults = Array.from({ length: 23 }, (_, i) => ({
          id: `officer${i + 1}`,
          name: `${officerName} Officer ${i + 1}`,
          title: `Loan Officer Title ${i + 1}`,
          phone: `555-000${i + 1}`,
          headshot: `https://example.com/headshot${i + 1}.jpg`,
          email: `officer${i + 1}@guild.com`,
          branch: {
            name: `Branch ${i + 1}`,
            id: `branch${i + 1}`,
            phone: `555-100${i + 1}`,
          },
        }));
        setOfficerTotal(allResults.length);
        setOfficerResults(allResults);
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
        // Simulate a large dataset with all fields
        const allResults = Array.from({ length: 17 }, (_, i) => ({
          id: `branch${i + 1}`,
          name: `${branchLocation} Branch ${i + 1}`,
          phone: `555-200${i + 1}`,
          email: `branch${i + 1}@guild.com`,
          address: {
            street: `${i + 1} Main St`,
            city: `City${i + 1}`,
            state: "CA",
            zip: `9000${i + 1}`,
          },
        }));
        setBranchTotal(allResults.length);
        setBranchResults(allResults);
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
    if (data.officerId) {
      updateField("loanOfficer", (prev) => ({
        ...prev,
        id: data.officerId,
      }));
      updateField("branch", (prev) => ({
        ...prev,
        id: "",
      }));
    } else if (data.branchId) {
      updateField("branch", (prev) => ({
        ...prev,
        id: data.branchId,
      }));
      updateField("loanOfficer", (prev) => ({
        ...prev,
        id: "",
      }));
    }
    navigate("/review-submit");
  };

  // Default empty structures for resetting
  const defaultLoanOfficer = {
    name: "",
    title: "",
    phone: "",
    headshot: "",
    email: "",
    id: "",
    branch: { name: "", id: "", phone: "" },
  };
  const defaultBranch = {
    name: "",
    id: "",
    phone: "",
    email: "",
    address: { street: "", city: "", state: "", zip: "" },
  };

  // Combined SearchResults: handles both results and pagination
  function SearchResults({
    show,
    results,
    selectedId,
    onSelect,
    type,
    total,
    page,
    setPage,
    pageSize,
  }) {
    if (!show) return null;
    return (
      <div
        className={`flex flex-col w-full ${type === "branch" ? "mt-2" : ""}`}
      >
        <div className="w-full bg-gray-50 border border-gray-200 rounded mt-1 mb-2 p-1 max-h-60 overflow-y-auto">
          {results.map((item) => (
            <div
              key={item.id}
              className={`flex items-center justify-between py-1 px-2 cursor-pointer rounded transition-colors ${
                selectedId === item.id ? "bg-cyan-100" : "hover:bg-gray-200"
              }`}
              onClick={() => onSelect(item.id, item.name)}
            >
              <div className="flex items-center">
                {/* Optionally add an icon here */}
                <span>{item.name}</span>
                <span className="text-xs text-gray-400 ml-2">({item.id})</span>
              </div>
              <div className="flex items-center ml-2">
                <input
                  type="radio"
                  checked={selectedId === item.id}
                  onChange={() => onSelect(item.id, item.name)}
                  className="form-radio text-primary focus:ring-primary h-4 w-4"
                  value={item.id}
                  tabIndex={-1}
                  name={type}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <div className="flex flex-col items-center w-full">
        <FormContainer>
          <h2 className="mb-4 text-lg font-semibold text-center">
            Select a loan officer
          </h2>
          <div className="flex flex-wrap gap-4 mb-4 w-full items-end">
            {[
              {
                key: "officer",
                placeholder: "Search by name ",
                label: "Search for a loan officer",
                value: officerName,
                setValueFn: setOfficerName,
                setResults: setOfficerResults,
                clearFormState: () => {
                  setValue("officerId", "", {
                    shouldDirty: true,
                    shouldValidate: true,
                  });
                  updateField("loanOfficer", (prev) => ({ ...prev, id: "" }));
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
                  updateField("branch", (prev) => ({ ...prev, id: "" }));
                },
                otherValue: officerName,
                setLast: () => setLastSearchType("branch"),
                clearLast: () => setLastSearchType(null),
                iconTest: !!branchLocation,
              },
            ].map((field) => (
              <div
                key={field.key}
                className="flex-1 min-w-[200px] w-full sm:w-auto flex flex-col justify-end"
              >
                <h3 className="mb-1 font-medium">{field.label}</h3>
                <div className="relative">
                  <FormInput
                    label={field.placeholder}
                    type="text"
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
                    className="pr-10 h-[44px]"
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                    onClick={() => {
                      if (field.iconTest) {
                        field.setValueFn("");
                        field.setResults([]);
                        field.clearFormState();
                        if (!field.otherValue) field.clearLast();
                      }
                    }}
                  >
                    {field.iconTest ? <CloseIcon /> : <SearchIcon />}
                  </button>
                </div>
              </div>
            ))}
            <div className="flex-1 min-w-[80px] w-full sm:w-auto flex flex-col justify-end">
              <h3 className="mb-1 font-medium">Radius</h3>
              <Dropdown
                value={radiusValue}
                onChange={(e) => {
                  setValue("radius", e.target.value, {
                    shouldDirty: true,
                    shouldValidate: true,
                  });
                  updateField("radius", e.target.value);
                }}
                options={[5, 10, 15, 20, 25, 50, 75, 100]}
                label="Radius"
                selectProps={{
                  id: "radius-dropdown",
                  error: !!errors.radiusValue,
                  className: "h-[44px]",
                }}
              />
              {errors.radiusValue && (
                <div className="text-red-600 text-xs mt-1">
                  {errors.radiusValue.message}
                </div>
              )}
            </div>
          </div>
          <SearchResults
            show={lastSearchType === "officer" && officerResults.length > 0}
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
              const selected = officerResults.find((o) => o.id === id);
              updateField("loanOfficer", () => selected || defaultLoanOfficer);
              updateField("branch", () => defaultBranch);
            }}
            type="officer"
            total={officerTotal}
            page={officerPage}
            setPage={setOfficerPage}
            pageSize={pageSize}
          />
          <SearchResults
            show={lastSearchType === "branch" && branchResults.length > 0}
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
              const selected = branchResults.find((b) => b.id === id);
              updateField("branch", () => selected || defaultBranch);
              updateField("loanOfficer", () => defaultLoanOfficer);
            }}
            type="branch"
            total={branchTotal}
            page={branchPage}
            setPage={setBranchPage}
            pageSize={pageSize}
          />
        </FormContainer>
        <div className="flex justify-center w-full mt-4">
          <Button
            type="submit"
            disabled={!isDirty || !isValid}
            className="min-w-[110px]"
          >
            Next
          </Button>
        </div>
        {errors && errors["one-required"] && (
          <div className="text-red-600 mt-1 text-sm text-center">
            {errors["one-required"].message}
          </div>
        )}
      </div>
    </form>
  );
}
