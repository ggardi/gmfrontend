import React, { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import ReCAPTCHA from "react-google-recaptcha";

export default function CreatePassword({ onClose, runtimeConfig }) {
  const siteKey =
    runtimeConfig?.RECAPTCHA_SITE_KEY ??
    "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const criteria = [
    {
      label: "Between 8 - 25 characters",
      valid: password.length >= 8 && password.length <= 25,
    },
    {
      label: "At least 1 upper case letter",
      valid: /[A-Z]/.test(password),
    },
    {
      label: "At least 1 lower case letter",
      valid: /[a-z]/.test(password),
    },
    {
      label: "At least 1 special character",
      valid: /[^A-Za-z0-9]/.test(password),
    },
    {
      label: "At least 1 number",
      valid: /[0-9]/.test(password),
    },
  ];

  const passwordsMatch =
    password && confirmPassword && password === confirmPassword;
  const allCriteriaMet = criteria.every((c) => c.valid);
  const canSubmit = allCriteriaMet && passwordsMatch && !!recaptchaValue;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.10)",
          pointerEvents: "none",
        }}
      />
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl font-bold"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-lg font-semibold mb-4">
          Create Password to complete your account setup
        </h2>
        <form>
          <div className="flex flex-col w-full">
            <div className="relative mb-3">
              <FormInput
                type={showPassword ? "text" : "password"}
                label="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                tabIndex={-1}
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </button>
            </div>
            <ul className="mb-3 text-xs text-gray-600 space-y-1">
              {criteria.map((c, i) => (
                <li key={i} className="flex items-center gap-2">
                  {c.valid ? (
                    <span className="text-green-600">&#10003;</span>
                  ) : (
                    <span className="inline-block w-4" />
                  )}
                  <span className={c.valid ? "text-green-700" : undefined}>
                    {c.label}
                  </span>
                </li>
              ))}
            </ul>
            <div className="relative mb-4">
              <FormInput
                type={showConfirmPassword ? "text" : "password"}
                label="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                tabIndex={-1}
                onClick={() => setShowConfirmPassword((v) => !v)}
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </button>
            </div>
            <ReCAPTCHA
              sitekey={siteKey}
              // TODO-BFF: Verify Google reCAPTCHA token with backend before allowing password set
              onChange={setRecaptchaValue}
              className="mb-4"
            />
            <Button type="submit" fullWidth={true} disabled={!canSubmit}>
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
