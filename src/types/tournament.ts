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

type User = {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  imageUrl?: string | null;
  organizerName?: string | null;
  organizerEmail?: string | null;
  organizerPhone?: string | null;
  isVerified: boolean;
};

interface AgeRestrictions {
  minAge: number;
  maxAge?: number;
}

interface GeoCoordinates {
  latitude: number;
  longitude: number;
}

export interface Tournament {
  ageRestrictions: AgeRestrictions;
  city: string;
  createdAt: string;
  dateEnd: string;
  dateStart: string;
  description: string;
  entryFee: number;
  geoCoordinates: GeoCoordinates;
  id: string;
  images: Image[];
  location: string;
  maxParticipants: number;
  participants: number;
  organizer: User;
  prizePool: number;
  rules: string;
  skillLevel: TournamentSkillLevel;
  format: TournamentFormat;
  sportType: TournamentSport;
  status: TournamentStatus;
  title: string;
  updatedAt: string;
}

export type Image = {
  id: string;
  publicId: string;
  secureUrl: string;
  tournamentId: string;
  url: string;
};

export const emptyTournamentRequest: Tournament = {
  ageRestrictions: {
    minAge: 0,
    maxAge: 0,
  },
  city: "",
  createdAt: "",
  participants: 0,
  dateEnd: "",
  dateStart: "",
  description: "",
  entryFee: 0,
  geoCoordinates: {
    latitude: 0,
    longitude: 0,
  },
  id: "",
  images: [],
  location: "",
  maxParticipants: 0,
  organizer: {
    id: "",
    email: "",
    isVerified: false,
  },
  prizePool: 0,
  rules: "",
  skillLevel: TournamentSkillLevel.Beginner,
  format: TournamentFormat.Singles,
  sportType: TournamentSport.Badminton,
  status: TournamentStatus.Upcoming,
  title: "",
  updatedAt: "",
};
