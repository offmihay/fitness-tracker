export {};

declare global {
  interface UserUnsafeMetadata {
    birthday?: Date | string;
    organizerName?: string;
    organizerDetails?: string;
    organizerEmail?: string;
    organizerPhone?: string;
    phoneNumber?: string;
  }
}
