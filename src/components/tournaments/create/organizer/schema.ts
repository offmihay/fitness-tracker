import { z } from "zod";

export const schemaOrganizer = z.object({
  organizerName: z
    .string({ required_error: "Organization Name is required" })
    .trim()
    .min(1, { message: "Name is required" }),
  organizerPhone: z.string().optional(),
  organizerEmail: z
    .string({ required_error: "Email is required" })
    .trim()
    .min(1, { message: "Email is required" }),
  organizerDetails: z.string().optional(),
});
export type OrganizerFormData = z.infer<typeof schemaOrganizer>;
