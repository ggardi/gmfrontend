import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./assets/fonts.css";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./config/authConfig";

const msalInstance = new PublicClientApplication(msalConfig);

ReactDOM.createRoot(document.getElementById("root")).render(
  <MsalProvider instance={msalInstance}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MsalProvider>
);
