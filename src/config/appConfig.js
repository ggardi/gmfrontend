// src/config/appConfig.js

const LOGPATH =
  "https://myaccount.guildmortgage.com/lib/uploads/branches/logos/";

const domainConfigs = {
  "guildmortgage.com": {
    logoName: "guild-logo-white-2.svg",
    footer: "© 2025 Guild Mortgage. All rights reserved.",
  },
  "belco.com": {
    logoName: "Belco-logo-applyonline.jpg",
    footer: "Development environment footer content.",
  },
  "viewmortgage.com": {
    logoName: "View-logo-applyonline.jpg",
    footer: "Development environment footer content.",
  },
  "bettermortgage.com": {
    logoName: "Better-logo-applyonline.jpg",
    footer: "© 2025 Better Mortgage. All rights reserved.",
  },
};

export function getDomainConfig() {
  const hostname = window.location.hostname;
  return domainConfigs[hostname] || domainConfigs["localhost"];
}

const appConfig = {
  headerLogo:
    "https://static-dev.guildmortgage.com/static/img/guild-logo-white-2.svg",
  headerLogoLink: "https://www.guildmortgage.com/",
};

export default appConfig;
