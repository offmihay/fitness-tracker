import { Query } from "@/src/types/query";
import { TournamentSport, TournamentSkillLevel } from "@/src/types/tournament";

export type Range = {
  min?: number;
  max?: number;
};

export type FilterHome = {
  sportType: TournamentSport[];
  skillLevel: TournamentSkillLevel[];
  date: string;
  prizePool: Range;
  entryFee: Range;
};

export type FilterGroup = Pick<FilterHome, "sportType" | "skillLevel">;
export type FilterSingle = Pick<FilterHome, "date">;
export type FilterRange = Pick<FilterHome, "prizePool" | "entryFee">;

export enum SortValueHome {
  Newest = "newest",
  Upcoming = "upcoming",
  PrizePool = "prizePool",
  Distance = "distance",
}

export type TournamentQuery = Query &
  FilterHome & {
    sortBy: "dateStart" | "prizePool" | "dateCreated";
  };
