// src/authConfig.js
// Replace the values below with your Azure B2C tenant and app registration info

export const msalConfig = {
  auth: {
    clientId: "YOUR_CLIENT_ID", // Application (client) ID from Azure portal
    authority:
      "https://YOUR_TENANT_NAME.b2clogin.com/YOUR_TENANT_NAME.onmicrosoft.com/B2C_1_signupsignin", // Default user flow
    knownAuthorities: ["YOUR_TENANT_NAME.b2clogin.com"],
    redirectUri: "http://localhost:3000", // Or your deployed app URL
  },
};
