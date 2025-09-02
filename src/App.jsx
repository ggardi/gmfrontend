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
        main: "#262A82", // Guild brand primary color
        contrastText: "#fff",
      },
      secondary: {
        main: "#f3c300", // Guild brand secondary color
        contrastText: "#262A82",
      },
      action: {
        disabled: "#DFDFDF",
      },
      // add more custom colors or palette options here
    },
    typography: {
      fontFamily:
        "'GuildCircularWeb', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: (theme) => ({
          a: {
            fontWeight: 400,
            textTransform: "none",
            letterSpacing: "0.4px",
            color: "#0000f0",
            fontSize: "12px",
            textDecoration: "none",
            transition: "color 0.2s",
          },
          "a:hover, a:focus": {
            textDecoration: "underline",
          },
          h2: {
            color: theme.palette.primary.main,
          },
        }),
      },
      MuiButton: {
        styleOverrides: {
          root: {
            minWidth: 121,
            minHeight: 48,
            fontSize: 16,
            borderRadius: 0,
            textTransform: "none",
            boxShadow: "none",
          },
        },
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
