import AlertTitle from "@mui/material/AlertTitle";
import { create } from "zustand";

export const useFormStore = create((set) => ({
  // Initial form data
  formData: {
    firstName: "",
    lastName: "",
    email: "",
    loanType: "",
    propertyState: "",
    loanOfficer: {
      name: "",
      title: "",
      phone: "",
      headshot: "",
      email: "",
      id: "",
      branch: { name: "", id: "", phone: "" },
    },
    branch: {
      name: "",
      id: "",
      phone: "",
      email: "",
      address: { street: "", city: "", state: "", zip: "" },
    },
    domainName: "",
    radius: "", // Not required, but tracked
  },

  // Update a field
  updateField: (field, value) =>
    set((state) => ({
      formData: {
        ...state.formData,
        [field]:
          typeof value === "function" ? value(state.formData[field]) : value,
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
        loanOfficer: {
          name: "",
          title: "",
          phone: "",
          headshot: "", //https://static-images-dev.guildmortgage.com/lib/uploads/officers/head-shots/detbr-tim-brown.jpg
          email: "",
          id: "",
          branch: { name: "", id: "", phone: "" },
        },
        branch: {
          name: "",
          id: "",
          phone: "",
          email: "",
          address: { street: "", city: "", state: "", zip: "" },
        },
        domainName: "",
        radius: "",
      },
    })),
}));
