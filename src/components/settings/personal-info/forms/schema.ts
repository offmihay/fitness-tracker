import { z } from "zod";

export const schemaChangeName = z.object({
  firstName: z
    .string({ required_error: "First name is required" })
    .trim()
    .min(1, { message: "First name is required" }),
  lastName: z.string().optional(),
});
export type ChangeNameForm = z.infer<typeof schemaChangeName>;

export const schemaChangeBirthday = z.object({
  birthday: z.date({ required_error: "Birthday is required" }),
});
export type ChangeBirthdayForm = z.infer<typeof schemaChangeBirthday>;
