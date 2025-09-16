import { Routes, Route } from "react-router-dom";
import AboutYou from "./routes/AboutYou";
import LoanType from "./routes/LoanType";
import PropertyState from "./routes/PropertyState";
import LoanOfficer from "./routes/LoanOfficer";
import ReviewSubmit from "./routes/ReviewSubmit";
import CreatePassword from "./routes/CreatePassword";
import { useEffect, useState } from "react";
import { loadConfig } from "./utils/configLoader";
import { getAppParams, getDomainConfig } from "./config/appConfig";
import { useFormStore } from "./store/formStore";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DebugFormState from "./components/DebugFormState";

export default function App() {
  // Load runtime config before rendering app
  const [configLoaded, setConfigLoaded] = useState(false);
  const [configError, setConfigError] = useState(null);
  useEffect(() => {
    loadConfig()
      .then((cfg) => {
        // Optionally: make config available via context or global state
        // For now, just log it
        console.log("Loaded runtime config:", cfg);
        setConfigLoaded(true);
      })
      .catch((err) => {
        setConfigError(err.message);
      });
  }, []);
  const updateField = useFormStore((state) => state.updateField);
  useEffect(() => {
    if (!configLoaded) return;
    const { domainName, officerId, branchId } = getAppParams();
    updateField("domainName", domainName);
    if (officerId) updateField("officerId", officerId);
    if (branchId) updateField("branchId", branchId);
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
          <Route path="/review-submit" element={<ReviewSubmit />} />
          <Route path="/create-password" element={<CreatePassword />} />
        </Routes>
      </main>
      <Footer domainConfig={domainConfig} />
      <DebugFormState />
    </div>
  );
}
