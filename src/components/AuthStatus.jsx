import { useMsal } from "@azure/msal-react";

const AuthStatus = ({ onNext }) => {
  const { accounts } = useMsal();
  const user = accounts && accounts[0];

  if (!user) return null;

  // Grouped Tailwind classes for maintainability
  const containerClasses = [
    "text-center",
    "p-6",
    "flex flex-col items-center",
  ].join(" ");

  const sectionClasses = ["mb-4"].join(" ");

  const labelClasses = [
    "text-xs font-semibold text-gray-700 uppercase tracking-wide",
    "mb-1 mt-4 first:mt-0",
  ].join(" ");

  // Simplified: single string for value/info classes
  const valueClasses = "text-base text-gray-900";
  const infoTextClasses = "mb-4 text-sm text-gray-700";

  return (
    <div className={containerClasses}>
      <div className={infoTextClasses}>
        Here's the name and email we have on file for you. By clicking next, you
        will be creating an application with this information.
      </div>
      <div className={sectionClasses}>
        <div className={labelClasses}>Name</div>
        <div className={valueClasses}>{user.name || user.username}</div>
        <div className={labelClasses}>Email</div>
        <div className={valueClasses}>{user.username}</div>
      </div>
      <button
        type="button"
        className={[
          "inline-flex items-center justify-center",
          "bg-[var(--color-primary)] text-white",
          "hover:opacity-80",
          "transition-all duration-150",
          "w-[121px] h-[48px]",
          "text-base font-semibold leading-tight",
          "cursor-pointer",
        ].join(" ")}
        onClick={onNext}
      >
        Next
      </button>
    </div>
  );
};

export default AuthStatus;
