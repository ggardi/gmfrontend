import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Footer = () => (
  <Box
    component="footer"
    sx={{
      bgcolor: "var(--color-footer-bg)",
      color: "var(--color-footer-text)",
      py: 2,
      textAlign: "center",
      boxShadow: "var(--shadow-footer)",
    }}
  >
    <Typography variant="body2">© 2025 Guild. All rights reserved.</Typography>
  </Box>
);

export default Footer;
