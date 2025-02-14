import React, { createContext, useState } from "react";
import { TournamentSport } from "@/src/types/tournament";

export type WizardPreferences = {
  role?: "organizer" | "participant";
  featuredSport?: TournamentSport[];
  residencePlace?: {
    geoCoordinates: {
      latitude?: number;
      longitude?: number;
    };
    city: string;
  };
};

type WizardContextType = {
  wizardData: WizardPreferences;
  setWizardData: React.Dispatch<React.SetStateAction<WizardPreferences>>;
};

export const WizardContext = createContext<WizardContextType>({
  wizardData: {},
  setWizardData: () => {},
});

export const WizardProvider = ({ children }: { children: React.ReactNode }) => {
  const [wizardData, setWizardData] = useState<WizardPreferences>({});

  return (
    <WizardContext.Provider value={{ wizardData, setWizardData }}>
      {children}
    </WizardContext.Provider>
  );
};
