import { TournamentSportType, TournamentSkillLevel } from "@/src/types/TournamentType";

export type Range = {
  min?: number;
  max?: number;
};

export type Filter = {
  sportType: TournamentSportType[];
  skillLevel: TournamentSkillLevel[];
  date: Date | string;
  prizePool: Range;
  entryFee: Range;
};

export type FilterGroup = Pick<Filter, "sportType" | "skillLevel">;
export type FilterSingle = Pick<Filter, "date">;
export type FilterRange = Pick<Filter, "prizePool" | "entryFee">;
