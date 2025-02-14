export {};

declare global {
  interface UserUnsafeMetadata {
    birthday?: Date | string;
    organizerName?: string;
    organizerDetails?: string;
    organizerEmail?: string;
    organizerPhone?: string;
    phoneNumber?: string;
    role?: "organizer" | "participant";
    sport?: TournamentSport[];
    residencePlace?: {
      geoCoordinates: {
        latitude?: number;
        longitude?: number;
      };
      city: string;
    };
  }
}
