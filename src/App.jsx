import { Routes, Route } from "react-router-dom";
import AboutYou from "./routes/AboutYou";
import LoanType from "./routes/LoanType";
import PropertyState from "./routes/PropertyState";
import LoanOfficer from "./routes/LoanOfficer";
import ReviewSubmit from "./routes/ReviewSubmit";
import CreatePassword from "./routes/CreatePassword";
import { useEffect, useState } from "react";
import { loadConfig } from "./config/runtimeConfigLoader";
import { getAppParams, getDomainConfig } from "./config/brandingConfig";
import { useFormStore } from "./store/formStore";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DebugFormState from "./components/DebugFormState";

export default function App() {
  // Load runtime config before rendering app
  const [runtimeConfig, setRuntimeConfig] = useState(null);
  const [configLoaded, setConfigLoaded] = useState(false);
  const [configError, setConfigError] = useState(null);
  useEffect(() => {
    loadConfig()
      .then((cfg) => {
        setRuntimeConfig(cfg);
        setConfigLoaded(true);
      })
      .catch((err) => {
        setConfigError(err.message);
      });
  }, []);
  const updateField = useFormStore((state) => state.updateField);

  // Set initial formStore data with new nested format
  useEffect(() => {
    if (!configLoaded) return;
    const { domainName, officerId, branchId } = getAppParams();
    // Set top-level fields
    updateField("domainName", domainName);
    // Set nested loanOfficer and branch objects with default structure
    updateField("loanOfficer", {
      name: "",
      title: "",
      phone: "",
      headshot: "",
      email: "",
      id: officerId || "",
      branch: { name: "", id: branchId || "", phone: "" },
    });
    updateField("branch", {
      name: "",
      id: branchId || "",
      phone: "",
      email: "",
      address: { street: "", city: "", state: "", zip: "" },
    });
  }, [updateField, configLoaded]);

  if (configError) {
    return (
      <div style={{ padding: 32, color: "red" }}>
        Error loading config: {configError}
      </div>
    );
  }
  if (!configLoaded) {
    return <div style={{ padding: 32 }}>Loading configuration...</div>;
  }
  const domainConfig = getDomainConfig();
  return (
    <div className="flex flex-col min-h-screen">
      <Header domainConfig={domainConfig} />
      <main id="apply-online" className="flex-grow mt-6 mb-6">
        <Routes>
          <Route path="*" element={<AboutYou />} />
          <Route path="/" element={<AboutYou />} />
          <Route path="/about-you" element={<AboutYou />} />
          <Route path="/branches" element={<AboutYou />} />
          <Route path="/branches/:branchId/*" element={<AboutYou />} />
          <Route path="/officers" element={<AboutYou />} />
          <Route path="/officers/:officerId/*" element={<AboutYou />} />
          <Route path="/loan-type" element={<LoanType />} />
          <Route path="/property-state" element={<PropertyState />} />
          <Route path="/loan-officer" element={<LoanOfficer />} />
          <Route
            path="/review-submit"
            element={<ReviewSubmit runtimeConfig={runtimeConfig} />}
          />
        </Routes>
      </main>
      <Footer domainConfig={domainConfig} />
      <DebugFormState />
    </div>
  );
}
