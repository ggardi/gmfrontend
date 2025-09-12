import React, { useEffect, useState } from "react";
import defaultLogo from "../assets/img/guild-logo.svg";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import Box from "@mui/material/Box";
import { useFormStore } from "../store/formStore";
import { getDomainConfig } from "../config/appConfig";

const DEFAULT_LOGO = defaultLogo;

const Header = () => {
  const domainName = useFormStore((state) => state.formData.domainName);
  const domainConfig = getDomainConfig();
  const [logoSrc, setLogoSrc] = useState(domainConfig.logoUrl || DEFAULT_LOGO);
  const logoAlt = domainName ? `${domainName} Logo` : "Site Logo";
  const logoLink = domainConfig.headerLogoLink;

  useEffect(() => {
    if (!domainConfig.logoUrl || domainConfig.logoUrl === DEFAULT_LOGO) {
      setLogoSrc(DEFAULT_LOGO);
      return;
    }
    const img = new window.Image();
    img.onload = () => setLogoSrc(domainConfig.logoUrl);
    img.onerror = () => setLogoSrc(DEFAULT_LOGO);
    img.src = domainConfig.logoUrl;
  }, [domainConfig.logoUrl]);

  return (
    <AppBar
      position="static"
      color="default"
      sx={{ bgcolor: "#fff", padding: "0 40px" }}
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <a
            href={logoLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center" }}
          >
            <Box
              component="img"
              src={logoSrc}
              alt={logoAlt}
              sx={{
                width: 126,
                height: "auto",
                display: "block",
                margin: "23px 0",
              }}
            />
          </a>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "flex-end",
            flexGrow: 0,
          }}
        >
          <a
            href={logoLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginRight: 16, alignSelf: "center" }}
          >
            Back to Site
          </a>
          <a href="/contact-us" style={{ alignSelf: "center" }}>
            Contact Us
          </a>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
