export enum TournamentSport {
  BADMINTON = "BADMINTON",
  TENNIS = "TENNIS",
  SQUASH = "SQUASH",
  TABLE_TENNIS = "TABLE_TENNIS",
}
export enum TournamentSkillLevel {
  AMATEUR = "AMATEUR",
  INTERMEDIATE = "INTERMEDIATE",
  PROFESSIONAL = "PROFESSIONAL",
}

export enum TournamentStatus {
  UPCOMING = "UPCOMING",
  ONGOING = "ONGOING",
  FINISHED = "FINISHED",
}

export enum TournamentFormat {
  SINGLES = "SINGLES",
  DOUBLES = "DOUBLES",
  SQUAD = "SQUAD",
}

type User = {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
  organizerName?: string;
  organizerEmail?: string;
  organizerPhone?: string;
  organizerDetails?: string;
  isVerified?: boolean;
};

interface AgeRestrictions {
  minAge: number;
  maxAge?: number;
}

interface GeoCoordinates {
  latitude: number;
  longitude: number;
}

export interface TournamentBase {
  createdAt: string;
  dateEnd: string;
  dateStart: string;
  description: string;
  entryFee: number;
  id: string;
  images: Image[] | [];
  location: string;
  maxParticipants: number;
  participantsCount: number;
  prizePool: number;
  sportType: TournamentSport;
  status: TournamentStatus;
  isActive: boolean;
  title: string;
  geoCoordinates: GeoCoordinates;
  updatedAt: string;
  role: "participant" | "organizer" | null;
  joinedCreatedAt: string;
  isApproved: boolean;
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
  images: Image[] | [];
  location: string;
  maxParticipants: number;
  participants: User[];
  organizer: User;
  prizePool: number;
  rules: string;
  skillLevel: TournamentSkillLevel;
  format: TournamentFormat;
  sportType: TournamentSport;
  status: TournamentStatus;
  title: string;
  isActive: boolean;
  updatedAt: string;
  participantsCount: number;
  role: "participant" | "organizer" | null;
  joinedCreatedAt: string;
  isApproved: boolean;
}

export type Image = {
  id: string;
  publicId: string;
  secureUrl: string;
  tournamentId: string;
  url: string;
};

export const emptyTournament: Tournament = {
  ageRestrictions: {
    minAge: 0,
    maxAge: 0,
  },
  city: "",
  createdAt: "",
  participants: [],
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
  skillLevel: TournamentSkillLevel.AMATEUR,
  format: TournamentFormat.SINGLES,
  sportType: TournamentSport.BADMINTON,
  status: TournamentStatus.UPCOMING,
  title: "",
  updatedAt: "",
  isActive: true,
  participantsCount: 0,
  role: null,
  joinedCreatedAt: "",
  isApproved: false,
};

export const emptyBaseTournament: TournamentBase = {
  createdAt: "",
  participantsCount: 0,
  dateEnd: "",
  dateStart: "",
  description: "",
  entryFee: 0,
  id: "",
  images: [],
  location: "",
  maxParticipants: 0,
  prizePool: 0,
  sportType: TournamentSport.BADMINTON,
  status: TournamentStatus.UPCOMING,
  title: "",
  updatedAt: "",
  geoCoordinates: {
    latitude: 0,
    longitude: 0,
  },
  isActive: true,
  role: null,
  joinedCreatedAt: "",
  isApproved: false,
};
