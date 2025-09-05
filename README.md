# Guild Front-end

## Requirements

- **Node.js:** 24.1.0 (recommended)
  - Use [nvm](https://github.com/nvm-sh/nvm) or [nvs](https://github.com/jasongin/nvs) to manage Node versions.
- **npm:** Comes bundled with Node.js 24.x

> This project is tied to Node.js 24.1.0 for compatibility. Using other versions may cause unexpected issues with dependencies or build tools.

## Project Overview

Guild Front-end is a React application using [Vite](https://vitejs.dev/) for fast development, [Material UI](https://mui.com/) for UI components and theming, and [React Hook Form](https://react-hook-form.com/) with [Yup](https://github.com/jquense/yup) for form validation. Authentication is handled via Azure B2C (MSAL). Testing uses Jest + RTL (React Testing Library) + jsdom for component/unit/integration tests. jsdom provides virtual DOM for component level tests.

## Project Structure

```
src/
	components/      # Reusable UI components (Button, FormInput, etc.)
	routes/          # Page-level components (AboutYou, Home, etc.)
	store/           # State management (formStore.js)
	hooks/           # Custom React hooks
	utils/           # Utility functions
	assets/          # Images, icons
App.jsx            # Main app layout, theme setup
main.jsx           # App entry point
public/            # Static assets
vite.config.js     # Vite configuration
eslint.config.js   # Linting rules
jest.config.js     # Jest configuration
babel.config.js    # Babel configuration
```

## Setup & Run Instructions

1. **Install dependencies:**
   ```
   npm install
   ```
2. **Start development server:**
   ```
   npm run dev
   ```
3. **Build for production:**
   ```
   npm run build
   ```
4. **Preview production build:**
   ```
   npm run preview
   ```

## Best Practices

- **Styling:** Use Material UI's `ThemeProvider` and `sx` prop for consistent styles. Avoid inline styles and hardcoded colors.
- **Components:** Keep components small and reusable. Use the `components/` folder for shared UI elements.
- **Validation:** Use React Hook Form + Yup for all forms. Define validation schemas for clarity and maintainability.
- **Authentication:** Use MSAL hooks/context for Azure B2C integration. Store user state in context or global store.
- **Testing:** Write unit/integration tests for all components and logic. Use Jest/RTL conventions (`*.test.js[x]`, `__tests__` folder).
- **Imports:** Use relative imports for local modules. Group imports by type (libraries, components, styles).
- **Documentation:** Update this README and add comments to complex logic.

## Useful Commands

- **Lint code:**
  ```
  npm run lint
  ```
- **Format code:**
  ```
  npm run format
  ```
- **Run tests:**
  ```
  npm test
  ```

---

## Testing Setup

This project uses **Jest** and **React Testing Library** for unit and integration tests. The test environment is set to `jsdom` for React component support. Babel is configured for JSX/ESM syntax.

### How to Run All Tests

```
npm test
```

### How to Run a Single Test File

```
npx jest src/components/__tests__/AuthStatus.test.jsx
```

### Watch Mode (auto re-run on changes)

```
npm test -- --watch
```

### Additional Info

### jest-dom Setup: Why We Import Globally

We import `@testing-library/jest-dom` globally in our Jest setup file (`jest.setup.js`) instead of in each test file. This ensures all custom matchers (like `toBeInTheDocument`) are available everywhere, reducing errors and boilerplate.

**Pros:**

- No need to import in every test file (DRY)
- Reduces risk of missing matchers and related errors
- Common best practice for React projects

**Cons:**

- Less explicit in individual test files (but documented here)
- Slightly more “magic” for new contributors

If you prefer explicit imports, you can import `@testing-library/jest-dom` at the top of a test file, but the global setup is recommended for consistency and reliability.
