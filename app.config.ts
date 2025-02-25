import { ExpoConfig, ConfigContext } from "@expo/config";
import * as dotenv from "dotenv";

// initialize dotenv
dotenv.config();

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "SelfSport",
  scheme: "selfsport",
  slug: "selfsport",
  ios: {
    ...config.ios,
    bundleIdentifier: "com.selfsport.app",
    supportsTablet: true,
    infoPlist: {
      CADisableMinimumFrameDurationOnPhone: true,
      ITSAppUsesNonExemptEncryption: false,
    },
    config: {
      googleMapsApiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
    },
  },
  android: {
    ...config.android,
    package: "com.selfsport.app",
    config: {
      googleMaps: {
        apiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
      },
    },
  },
  web: {
    bundler: "metro",
  },
});
