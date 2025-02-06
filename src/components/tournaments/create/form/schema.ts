import { TournamentFormat, TournamentSkillLevel, TournamentSport } from "@/src/types/types";
import { z } from "zod";

const dateSchema = z
  .object({
    dateStart: z.date({ required_error: "Start date is required" }),
    dateEnd: z.date({ required_error: "End date is required" }),
  })
  .refine((data) => data.dateStart.getTime() <= data.dateEnd.getTime() + 1, {
    message: "End date must be after or equal to start date",
    path: ["dateEnd"],
  });

const moneySchema = z
  .object({
    entryFee: z.coerce.number({ required_error: "Entry fee is required" }).min(1),
    prizePool: z.coerce.number({ required_error: "Prize pool is required" }).min(1),
  })
  .refine((data) => data.entryFee < data.prizePool, {
    message: "Prize pool must be greater than entry fee",
    path: ["prizePool"],
  });

const restSchema = z.object({
  title: z.string({ required_error: "Title is required" }).trim().min(1),
  description: z.string({ required_error: "Description is required" }).trim().min(1),
  sportType: z.nativeEnum(TournamentSport, { message: "Invalid sport type" }),
  city: z.string({ required_error: "City is required" }).trim().min(1),
  location: z.string({ required_error: "Location is required" }).trim().min(1),

  skillLevel: z.nativeEnum(TournamentSkillLevel, { message: "Invalid skill level" }),
  maxParticipants: z.coerce.number({ required_error: "Max participants is required" }).min(1),
  rules: z.string().optional(),
  images: z
    .array(
      z.object({
        publicId: z.string(),
        secure_url: z.string().optional(),
      })
    )
    .refine((images) => images.length > 0, { message: "At least one image is required" }),
  format: z.nativeEnum(TournamentFormat, { message: "Invalid format" }).optional(),
  geoCoordinates: z
    .object({
      latitude: z.number({}),
      longitude: z.number({}),
    })
    .optional(),
  ageRestrictions: z
    .object({
      minAge: z.coerce.number({ message: "Min age is required" }).min(1),
      maxAge: z.coerce.number({ message: "Max age is required" }).min(1),
    })
    .refine((data) => data.minAge < data.maxAge, {
      message: "Max age must be greater than Min age",
      path: ["maxAge"],
    }),

  isOrganizerAdded: z
    .boolean()
    .refine((val) => val === true, {
      message: "Required organization details",
    })
    .optional(),
});

const schemaCreateTournament = z.intersection(z.intersection(dateSchema, moneySchema), restSchema);
export default schemaCreateTournament;
export type TournamentFormData = z.infer<typeof schemaCreateTournament>;
