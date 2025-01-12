export type TournamentFormData = {
  title: string;
  description: string;
  sportType: string;
  city: string;
  location: string;
  dateStart: string;
  dateEnd: string;
  entryFee: string;
  prizePool: string;
  skillLevel: string;
  format: string;
  maxParticipants: number;

  status: string;
  rules: string;
  images: ImageForm[];
  geoCoordinates: {
    latitude: number;
    longitude: number;
  };
  ageRestrictions: {
    minAge: number;
    maxAge: number;
  };
};

export type ImageForm = {
  publicId?: string;
};
