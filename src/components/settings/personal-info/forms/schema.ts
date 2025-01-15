import { z } from "zod";

export const schemaChangeName = z.object({
  firstName: z
    .string({ required_error: "First name is required" })
    .trim()
    .min(1, { message: "First name is required" }),
  lastName: z.string().optional(),
});
export type ChangeUserFormData = z.infer<typeof schemaChangeName>;

export const schemaChangeBirthday = z.object({
  birthday: z.date({ required_error: "Birthday is required" }),
});
export type ChangeBirthdayFormData = z.infer<typeof schemaChangeBirthday>;
