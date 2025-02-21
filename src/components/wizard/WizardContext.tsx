import React, { createContext, useState } from "react";
import { TournamentSport } from "@/src/types/tournament";

export type WizardPreferences = {
  role?: "organizer" | "participant";
  featuredSport?: TournamentSport[];
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
