import { z } from "zod";

/** Schema for Changing Name */
export const schemaChangeName = z.object({
  firstName: z
    .string({ required_error: "firstName_required" })
    .trim()
    .min(1, { message: "firstName_required" }),
  lastName: z.string().optional(),
});
export type ChangeNameForm = z.infer<typeof schemaChangeName>;

/** Schema for Changing Birthday */
export const schemaChangeBirthday = z.object({
  birthday: z.date({ required_error: "birthday_required" }),
});
export type ChangeBirthdayForm = z.infer<typeof schemaChangeBirthday>;

export const schemaChangeOrganizer = z.object({
  organizerName: z.string().optional(),
  organizerPhone: z.string().optional(),
  organizerEmail: z
    .string()
    .optional()
    .refine((val) => val === undefined || val === "" || z.string().email().safeParse(val).success, {
      message: "organizerEmail_invalid",
    }),
  organizerDetails: z.string().optional(),
});
export type ChangeOrganizerFormData = z.infer<typeof schemaChangeOrganizer>;
