import "intl-pluralrules";
import "../i18n/config";
import "../styles/global.css";
import AppProviders from "../providers/AppProviders";
import AuthGuard from "../components/auth/AuthGuard";
import "react-native-get-random-values";

if (process.env.NODE_ENV === "development") {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    if (!args[0]?.includes("Clerk has been loaded with development keys")) {
      originalWarn(...args);
    }
  };
}

const RootLayout = () => (
  <AppProviders>
    <AuthGuard />
  </AppProviders>
);

export default RootLayout;
