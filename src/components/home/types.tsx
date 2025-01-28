import { TournamentSport, TournamentSkillLevel } from "@/src/types/tournament";

export type Range = {
  min?: number;
  max?: number;
};

export type FilterHome = {
  sportType: TournamentSport[];
  skillLevel: TournamentSkillLevel[];
  date: Date | string;
  prizePool: Range;
  entryFee: Range;
};

export type FilterGroup = Pick<FilterHome, "sportType" | "skillLevel">;
export type FilterSingle = Pick<FilterHome, "date">;
export type FilterRange = Pick<FilterHome, "prizePool" | "entryFee">;

export enum SortValueHome {
  Newest = "newest",
  PrizePool = "prizePool",
  Distance = "distance",
}
