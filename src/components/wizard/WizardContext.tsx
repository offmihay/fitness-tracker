import React, { createContext, useState } from "react";
import { TournamentSport } from "@/src/types/tournament";
import { useMutation } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type WizardPreferences = {
  role?: "organizer" | "participant";
  featuredSport?: TournamentSport[];
  residencePlace?: {
    geoCoordinates?: {
      latitude: number;
      longitude: number;
    };
    city: string;
  };
};

type WizardContextType = {
  wizardData: WizardPreferences;
  updateWizardData: React.Dispatch<React.SetStateAction<WizardPreferences>>;
};

export const WizardContext = createContext<WizardContextType>({
  wizardData: {},
  updateWizardData: () => {},
});

export const WizardProvider = ({ children }: { children: React.ReactNode }) => {
  const [wizardData, setWizardData] = useState<WizardPreferences>({});

  return (
    <WizardContext.Provider value={{ wizardData, updateWizardData: setWizardData }}>
      {children}
    </WizardContext.Provider>
  );
};
