import { z, ZodType } from "zod";
import { TournamentFormData } from "./types";

export const TournamentSchema: ZodType<TournamentFormData> = z
  .object({
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string(),
    sportType: z.string().min(1, { message: "Sport type is required" }),
    city: z.string().min(1, { message: "City is required" }),
    location: z.string().min(1, { message: "Location is required" }),
    dateStart: z.date(),
    dateEnd: z.date(),
    entryFee: z.string().regex(/^[0-9]+(\.[0-9]{1,2})?$/, {
      message: "Invalid entry fee",
    }),
    prizePool: z.string().regex(/^[0-9]+(\.[0-9]{1,2})?$/, {
      message: "Invalid prize pool",
    }),
    skillLevel: z.string().min(1, { message: "Skill level is required" }),
    // format: z.string(),
    // maxParticipants: z
    //   .string({
    //     required_error: "Max age is required",
    //   })
    //   .regex(/^[0-9]+$/, { message: "Must be a valid number" }),

    rules: z.string().optional(),
    images: z.array(
      z.object({
        publicId: z.string().optional(),
      })
    ),
    // geoCoordinates: z.object({
    //   latitude: z.number({
    //     required_error: "Latitude is required",
    //     invalid_type_error: "Latitude must be a number",
    //   }),
    //   longitude: z.number({
    //     required_error: "Longitude is required",
    //     invalid_type_error: "Longitude must be a number",
    //   }),
    // }),
    ageRestrictions: z
      .object({
        minAge: z
          .string({
            required_error: "Min age is required",
          })
          .regex(/^[0-9]+$/, { message: "Must be a valid number" }),
        maxAge: z
          .string({
            required_error: "Max age is required",
          })
          .regex(/^[0-9]+$/, { message: "Must be a valid number" }),
      })
      .refine((data) => data.maxAge > data.minAge, {
        message: "Max age must be greater than Min age",
        path: ["maxAge"],
      }),
  })
  .refine((data) => data.dateStart.getTime() <= data.dateEnd.getTime(), {
    message: "End date must be after or equal to start date",
    path: ["dateEnd"],
  });
