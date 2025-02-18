import { TournamentFormat, TournamentSkillLevel, TournamentSport } from "@/src/types/tournament";
import { z } from "zod";

// Date schema with custom comparison messages and ensuring dateStart is in the future.
const dateSchema = z
  .object({
    dateStart: z.date({ required_error: "dateStart_required" }),
    dateEnd: z.date({ required_error: "dateEnd_required" }),
  })
  .refine((data) => data.dateStart.getTime() <= data.dateEnd.getTime() + 1, {
    // Changed error message to a shorter code: "date_range"
    message: "date_range",
    path: ["dateEnd"],
  })
  .refine((data) => data.dateStart.getTime() >= Date.now(), {
    message: "dateStart_must_be_in_future",
    path: ["dateStart"],
  });

// Money schema with custom messages for numeric fields and key-to-key comparisons.
const moneySchema = z
  .object({
    entryFee: z.coerce
      .number({
        required_error: "entryFee_required",
        invalid_type_error: "entryFee_required",
      })
      .min(1, { message: "entryFee_required" }),
    prizePool: z.coerce
      .number({
        required_error: "prizePool_required",
        invalid_type_error: "prizePool_required",
      })
      .min(1, { message: "prizePool_required" }),
  })
  .refine((data) => Number.isInteger(data.entryFee), {
    message: "entryFee_must_be_integer",
    path: ["entryFee"],
  })
  .refine((data) => Number.isInteger(data.prizePool), {
    message: "prizePool_must_be_integer",
    path: ["prizePool"],
  })
  .refine((data) => data.entryFee < data.prizePool, {
    message: "prizePool_must_be_greater_than_entryFee",
    path: ["prizePool"],
  });

const restSchema = z.object({
  title: z
    .string({ required_error: "title_required" })
    .trim()
    .min(1, { message: "title_required" })
    .max(100, { message: "title_maxlength" }),
  description: z
    .string({ required_error: "description_required" })
    .trim()
    .min(1, { message: "description_required" })
    .max(1000, { message: "description_maxlength" }),
  sportType: z.nativeEnum(TournamentSport, {
    errorMap: () => ({ message: "sportType_required" }),
  }),
  city: z.string({ required_error: "city_required" }).trim().min(1, { message: "city_required" }),
  location: z
    .string({ required_error: "location_required" })
    .trim()
    .min(1, { message: "location_required" }),

  skillLevel: z.nativeEnum(TournamentSkillLevel, {
    errorMap: () => ({ message: "skillLevel_required" }),
  }),
  maxParticipants: z.coerce
    .number({
      required_error: "maxParticipants_required",
      invalid_type_error: "maxParticipants_required",
    })
    .min(1, { message: "maxParticipants_required" }),
  rules: z.string().optional(),
  images: z
    .array(
      z.object({
        publicId: z.string({ required_error: "image_publicId_required" }),
        secure_url: z.string().optional(),
      })
    )
    .refine((images) => images.length > 0, { message: "images_required" }),
  format: z
    .nativeEnum(TournamentFormat, {
      errorMap: () => ({ message: "format_required" }),
    })
    .optional(),
  geoCoordinates: z
    .object({
      latitude: z.number({ invalid_type_error: "latitude_required" }),
      longitude: z.number({ invalid_type_error: "longitude_required" }),
    })
    .optional()
    .refine(
      (coords) =>
        coords === undefined ||
        (coords.latitude >= -90 &&
          coords.latitude <= 90 &&
          coords.longitude >= -180 &&
          coords.longitude <= 180),
      { message: "geoCoordinates_invalid" }
    ),
  ageRestrictions: z
    .object({
      minAge: z.coerce
        .number({
          required_error: "minAge_required",
          invalid_type_error: "minAge_required",
        })
        .min(1, { message: "minAge_required" }),
      maxAge: z.coerce
        .number({
          required_error: "maxAge_required",
          invalid_type_error: "maxAge_required",
        })
        .min(1, { message: "maxAge_required" }),
    })
    .refine((data) => data.minAge < data.maxAge, {
      message: "maxAge_must_be_greater_than_minAge",
      path: ["maxAge"],
    })
    .refine((data) => data.minAge >= 5, {
      message: "minAge_too_low",
      path: ["minAge"],
    }),
  isOrganizerAdded: z
    .boolean()
    .refine((val) => val === true, {
      message: "organizer_required",
    })
    .optional(),
});

const schemaCreateTournament = z.intersection(z.intersection(dateSchema, moneySchema), restSchema);
export default schemaCreateTournament;
export type TournamentFormData = z.infer<typeof schemaCreateTournament>;
