type Tournament = {
  id: string;
  sportType: string;
  city: string;
  location: string;
  geoCoordinates?: {
    latitude: number;
    longitude: number;
  };
  date: string;
  entryFee?: number;
  prizePool?: number;
  ageRestrictions?: {
    minAge?: number;
    maxAge?: number;
  };
  skillLevel?: "Beginner" | "Amateur" | "Professional";
  format?: "Singles" | "Doubles" | "Round Robin";
  maxParticipants?: number;
  currentParticipants?: Participant[];
  organizer: {
    id: string;
    name: string;
    contact?: {
      email?: string;
      phone?: string;
    };
    verified: boolean;
  };
  description?: string;
  status?: "Upcoming" | "Ongoing" | "Completed";
  imageUrl?: string;
};

type Participant = {
  id: string;
  name: string;
};
