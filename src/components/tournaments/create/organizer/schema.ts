import { z } from "zod";

export const schemaOrganizer = z.object({
  organizerName: z
    .string({ required_error: "organizerName_required" })
    .trim()
    .min(1, { message: "organizerName_required" }),
  organizerPhone: z.string().optional(),
  organizerEmail: z
    .string({ required_error: "organizerEmail_required" })
    .trim()
    .min(1, { message: "organizerEmail_required" })
    .email({ message: "organizerEmail_invalid" }),
  organizerDetails: z.string().optional(),
});
export type OrganizerFormData = z.infer<typeof schemaOrganizer>;
