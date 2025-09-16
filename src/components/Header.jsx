import React, { useRef } from "react";
import defaultLogo from "../assets/img/guild-logo.svg";
import { useFormStore } from "../store/formStore";

const DEFAULT_LOGO = defaultLogo;

const Header = ({ domainConfig }) => {
  const domainName = useFormStore((state) => state.formData.domainName);
  const logoAlt = domainName ? `${domainName} Logo` : "Site Logo";
  const logoLink = domainConfig.headerLogoLink;
  const imgRef = useRef(null);

  // Handler to fallback to default logo if image fails to load
  const handleLogoError = () => {
    if (imgRef.current && imgRef.current.src !== DEFAULT_LOGO) {
      imgRef.current.src = DEFAULT_LOGO;
    }
  };

  // Grouped Tailwind classes for maintainability
  const headerClasses = [
    "bg-white px-10",
    "shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)]", // bottom shadow only
  ].join(" ");

  const navLinkClasses = [
    "mr-4 self-center",
    "text-base text-gray-700 hover:text-primary transition-colors duration-150",
  ].join(" ");

  return (
    <header className={headerClasses}>
      <div className="flex items-center min-h-[64px]">
        <div className="flex-grow">
          <a
            href={logoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center"
          >
            <img
              ref={imgRef}
              src={domainConfig.logoUrl || DEFAULT_LOGO}
              alt={logoAlt}
              className="w-[126px] h-auto block my-[23px]"
              onError={handleLogoError}
            />
          </a>
        </div>
        <div className="flex gap-2 justify-end flex-grow-0">
          <a
            href={logoLink}
            target="_blank"
            rel="noopener noreferrer"
            className={navLinkClasses}
          >
            Back to Site
          </a>
          <a
            href="/contact-us"
            className="self-center text-base text-gray-700 hover:text-primary transition-colors duration-150"
          >
            Contact Us
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
