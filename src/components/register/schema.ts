import { z } from "zod";

export const schemaUserRegistration = z.object({
  firstName: z
    .string({ required_error: "First name is required" })
    .trim()
    .min(1, { message: "First name is required" }),
  lastName: z.string().optional(),
  phoneNumber: z.string().optional(),
});
export type UserRegistrationFormData = z.infer<typeof schemaUserRegistration>;
