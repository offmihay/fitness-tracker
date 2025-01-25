import { ExpoConfig, ConfigContext } from "@expo/config";
import * as dotenv from "dotenv";

// initialize dotenv
dotenv.config();

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "fitness-tracker",
  scheme: "fitness-tracker",
  slug: "fitness-tracker",
  ios: {
    bundleIdentifier: "com.offmihay.fitnesstracker",
    supportsTablet: true,
    infoPlist: {
      CFBundleURLTypes: [
        {
          CFBundleURLSchemes: [process.env.GOOGLE_OAUTH_CLIENT_ID],
        },
      ],
    },
    config: {
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    },
  },
  android: {
    package: "com.offmihay.fitnesstracker",
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    config: {
      googleMaps: {
        apiKey: process.env.GOOGLE_MAPS_API_KEY,
      },
    },
  },
  web: {
    bundler: "metro",
  },
  extra: {
    eas: {
      projectId: process.env.EAS_PROJECT_ID,
    },
  },
});
