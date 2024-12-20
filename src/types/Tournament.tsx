type SkillLevel = "Amateur" | "Beginner" | "Professional";
type Format = "Singles" | "Doubles" | "Squad";
type Status = "Upcoming" | "Ongoing" | "Finished";

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
  phone?: string; // optional, since not all examples have a phone
}

interface Organizer {
  id: string;
  name: string;
  contact: OrganizerContact;
  verified: boolean;
}

interface AgeRestrictions {
  minAge: number;
  maxAge?: number; // optional, as seen in the second item
}

interface GeoCoordinates {
  latitude: number;
  longitude: number;
}

export interface Tournament {
  id: string;
  sportType: string;
  city: string;
  location: string;
  geoCoordinates: GeoCoordinates;
  dateStart: string; // ISO datetime string
  dateEnd: string; // ISO datetime string
  entryFee: number;
  prizePool: number;
  ageRestrictions: AgeRestrictions;
  skillLevel: SkillLevel;
  format: Format;
  maxParticipants: number;
  currentParticipants: CurrentParticipants;
  organizer: Organizer;
  title: string;
  rules: string;
  description: string;
  status: Status;
  images: ImageResult[];
}

export type ImageResult = {
  url: string;
  secure_url: string;
  [key: string]: any;
};
