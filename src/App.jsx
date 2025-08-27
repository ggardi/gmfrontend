import "./assets/App.css";
import { Routes, Route } from "react-router-dom";
import AboutYou from "./routes/AboutYou";
import LoanType from "./routes/LoanType";
import PropertyState from "./routes/PropertyState";
import LoanOfficer from "./routes/LoanOfficer";
import ReviewSubmit from "./routes/ReviewSubmit";
import CreatePassword from "./routes/CreatePassword";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#1976d2", // Customize this color as needed
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Container maxWidth="md" sx={{ minHeight: "80vh", py: 4 }}>
        <div id="apply-online">
          <Routes>
            <Route path="/" element={<AboutYou />} />
            <Route path="/loan-type" element={<LoanType />} />
            <Route path="/property-state" element={<PropertyState />} />
            <Route path="/loan-officer" element={<LoanOfficer />} />
            <Route path="/review-submit" element={<ReviewSubmit />} />
            <Route path="/create-password" element={<CreatePassword />} />
          </Routes>
        </div>
      </Container>
      <Footer />
    </ThemeProvider>
  );
}
