export type TournamentFormData = {
  sportType: string;
  title: string;
  description: string;
  rules?: string;
  city: string;
  location: string;
  dateStart: Date;
  dateEnd: Date;
  entryFee: string;
  prizePool: string;
  skillLevel: string;
  format?: string;
  maxParticipants?: string;
  images: ImageForm[];
  geoCoordinates?: {
    latitude: number;
    longitude: number;
  };
  ageRestrictions: {
    minAge: string;
    maxAge: string;
  };
};

export type ImageForm = {
  publicId?: string;
};
