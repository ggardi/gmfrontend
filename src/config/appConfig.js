const domainConfigs = {
  "guildmortgage.com": {
    logoName: "guild-logo-white-2.svg",
    footer: "© 2025 Guild Mortgage. All rights reserved.",
    headerLogoLink: "https://www.guildmortgage.com/",
  },
  "belco.com": {
    logoName: "Belco-logo-applyonline.jpg",
    footer: "Development environment footer content.",
    headerLogoLink: "https://www.belco.com/",
  },
  "viewmortgage.com": {
    logoName: "View-logo-applyonline.jpg",
    footer: "Development environment footer content.",
    headerLogoLink: "https://www.viewmortgage.com/",
  },
  "betterbuiltmortgage.com": {
    logoName: "BetterBuilt-logo-applyonline.jpg",
    footer: "© 2025 Better Built Mortgage. All rights reserved.",
    headerLogoLink: "https://www.betterbuiltmortgage.com/",
  },
};

export function getDomainConfig() {
  const LOGPATH =
    "https://myaccount.guildmortgage.com/lib/uploads/branches/logos/";
  let hostname = window.location.hostname;
  const isLocal = hostname === "localhost" || hostname === "127.0.0.1";
  const params = new URLSearchParams(window.location.search);
  if (isLocal && params.get("domain")) {
    hostname = params.get("domain");
  }
  // Fallback to guildmortgage.com config if not found
  const config = domainConfigs[hostname] || domainConfigs["guildmortgage.com"];
  let logoUrl;
  if (config.logoName) {
    logoUrl = `${LOGPATH}${config.logoName}`;
  } else {
    // fallback to local asset if no logoName
    logoUrl = "/assets/img/guild-logo.svg";
  }
  return {
    ...config,
    logoUrl,
    headerLogoLink: config.headerLogoLink || "https://www.guildmortgage.com/",
    footer: config.footer || "© 2025 Guild Mortgage. All rights reserved.",
  };
}

export function getAppParams() {
  let domainName = window.location.hostname;
  const params = new URLSearchParams(window.location.search);
  const isLocal = domainName === "localhost" || domainName === "127.0.0.1";
  if (isLocal && params.get("domain")) {
    domainName = params.get("domain");
  }
  const path = window.location.pathname;
  const officerMatch = path.match(/\/officers\/(\w+)/);
  const branchMatch = path.match(/\/branches\/(\w+)/);
  return {
    domainName,
    officerId: officerMatch ? officerMatch[1] : undefined,
    branchId: branchMatch ? branchMatch[1] : undefined,
  };
}

const appConfig = {
  headerLogo:
    "https://static-dev.guildmortgage.com/static/img/guild-logo-white-2.svg",
  headerLogoLink: "https://www.guildmortgage.com/",
};

export default appConfig;
