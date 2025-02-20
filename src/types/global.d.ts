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
    featuredSport?: TournamentSport[];
    residencePlace?: {
      geoCoordinates: {
        latitude: number;
        longitude: number;
      };
      city: string;
    };
  }
}
