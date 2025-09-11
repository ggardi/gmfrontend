import { create } from "zustand";

export const useFormStore = create((set) => ({
  // Initial form data
  formData: {
    firstName: "",
    lastName: "",
    email: "",
    loanType: "",
    propertyState: "",
    loanOfficer: "",
    officerId: "",
    branchId: "",
    domainName: "",
  },

  // Update a field
  updateField: (field, value) =>
    set((state) => ({
      formData: {
        ...state.formData,
        [field]: value,
      },
    })),

  // Reset form
  resetForm: () =>
    set(() => ({
      formData: {
        firstName: "",
        lastName: "",
        email: "",
        loanType: "",
        propertyState: "",
        loanOfficer: "",
        officerId: "",
        branchId: "",
        domainName: "",
      },
    })),
}));
