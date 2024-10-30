import "intl-pluralrules";
import "../i18n/config";
import "../styles/global.css";
import Providers from "../providers/Providers";
import AuthGuard from "../components/auth/AuthGuard";

if (process.env.NODE_ENV === "development") {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    if (!args[0]?.includes("Clerk has been loaded with development keys")) {
      originalWarn(...args);
    }
  };
}

const RootLayout = () => (
  <Providers>
    <AuthGuard />
  </Providers>
);

export default RootLayout;
