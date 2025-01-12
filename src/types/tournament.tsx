export type TournamentSportType = "badminton" | "tennis" | "squash" | "tableTennis";
export type TournamentSkillLevel = "amateur" | "beginner" | "professional";
type Status = "upcoming" | "ongoing" | "finished";
type Format = "singles" | "doubles" | "squad";

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
  format: Format;
  sportType: string;
  status: Status;
  title: string;
}

export type Image = {
  id: string;
  publicId: string | null;
  secureUrl: string;
  tournamentId: string;
  url: string;
};
