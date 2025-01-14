export enum TournamentSport {
  Badminton = "badminton",
  Tennis = "tennis",
  Squash = "squash",
  TableTennis = "tableTennis",
}
export enum TournamentSkillLevel {
  Amateur = "amateur",
  Beginner = "beginner",
  Professional = "professional",
}

export enum TournamentStatus {
  Upcoming = "upcoming",
  Ongoing = "ongoing",
  Finished = "finished",
}

export enum TournamentFormat {
  Singles = "singles",
  Doubles = "doubles",
  Squad = "squad",
}

interface Participant {
  id: string;
  name: string;
}

interface CurrentParticipants {
  count: number;
  participants: Participant[];
}

interface OrganizerContact {
  email: string;
  phone?: string;
}

interface Organizer {
  id: string;
  name: string;
  contact: OrganizerContact;
  verified: boolean;
}

interface AgeRestrictions {
  minAge: number;
  maxAge?: number;
}

interface GeoCoordinates {
  latitude: number;
  longitude: number;
}

export interface TournamentRequest {
  ageRestrictions: AgeRestrictions;
  city: string;
  createdAt: string;
  currentParticipants: CurrentParticipants;
  dateEnd: string;
  dateStart: string;
  description: string;
  entryFee: number;
  geoCoordinates: GeoCoordinates;
  id: string;
  images: Image[];
  location: string;
  maxParticipants: number;
  organizer: Organizer;
  prizePool: number;
  rules: string;
  skillLevel: TournamentSkillLevel;
  format: TournamentFormat;
  sportType: string;
  status: TournamentStatus;
  title: string;
}

export type Image = {
  id: string;
  publicId: string | null;
  secureUrl: string;
  tournamentId: string;
  url: string;
};
