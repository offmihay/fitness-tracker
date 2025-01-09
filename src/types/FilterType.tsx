import { TournamentSportType, TournamentSkillLevel } from "@/src/types/TournamentType";

export type FilterGroup = {
  sportType: TournamentSportType[];
  skillLevel: TournamentSkillLevel[];
};

export type FilterSingle = {
  date: Date | string;
};

export type Range = {
  min?: number;
  max?: number;
};

export type FilterRange = {
  prizePool: Range;
  entryFee: Range;
};

export type Filter = {
  sportType: FilterGroup;
  skillLevel: FilterGroup;
  date: Date | string;
  prizePool: Range;
  entryFee: Range;
};
