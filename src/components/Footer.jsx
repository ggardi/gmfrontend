import React from "react";

const Footer = ({ domainConfig }) => {
  const footerClasses = [
    "w-full",
    "bg-gray-100",
    "py-10 px-6",
    "flex flex-col items-center",
    "shadow-md",
    "text-sm",
  ].join(" ");

  // Default footer text, can be replaced by domainConfig.footerText
  const footerText =
    (domainConfig && domainConfig.footerText) ||
    "© 2025 Guild. All rights reserved.";

  const linkClasses = [
    "text-[12px] text-[rgb(38,42,130)] font-normal font-[GuildCircularWeb,Helvetica,Arial,sans-serif] leading-[1.4em] no-underline hover:underline",
    "transition-colors duration-150",
  ].join(" ");

  // Use domainConfig.GUILD_BASE_URL or fallback to default
  const baseUrl =
    (domainConfig && domainConfig.GUILD_BASE_URL) ||
    "https://www-ppd.guildmortgage.com";

  const links = [
    { path: "/licensing/", label: "Licensing" },
    { path: "/privacy-notice/", label: "Privacy Notice" },
    { path: "/privacy-policy/", label: "Privacy Policy" },
    { path: "/site-map/", label: "Site Map" },
    { path: "/accessibility-statement/", label: "Accessibility Statement" },
    { path: "/terms-of-use/", label: "Terms of Use" },
    {
      path: "/report-cyber-security-issue/",
      label: "Report cyber security issue",
    },
  ];

  return (
    <footer className={footerClasses}>
      <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4 justify-center">
        {links.map(({ path, label }) => (
          <a
            key={path}
            href={`${baseUrl}${path}`}
            className={linkClasses}
            target="_blank"
            rel="noopener noreferrer"
          >
            {label}
          </a>
        ))}
      </div>
      <div>{footerText}</div>
    </footer>
  );
};

export default Footer;
